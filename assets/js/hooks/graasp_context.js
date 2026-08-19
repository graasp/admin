// Mirrors the postMessage handshake protocol used by
// `@graasp/apps-query-client` (see `postMessage.ts` in graasp-apps-query-client)
// so this LiveView can be embedded exactly like the existing React
// graasp-app-chatbot: the parent window (Graasp player/builder) answers
// `GET_CONTEXT_<itemId>` with a `MessageChannel` port, then that port is
// used to request `GET_AUTH_TOKEN_<itemId>`.
const buildKeys = (itemId) => ({
  GET_CONTEXT: `GET_CONTEXT_${itemId}`,
  GET_CONTEXT_SUCCESS: `GET_CONTEXT_SUCCESS_${itemId}`,
  GET_CONTEXT_FAILURE: `GET_CONTEXT_FAILURE_${itemId}`,
  GET_AUTH_TOKEN: `GET_AUTH_TOKEN_${itemId}`,
  GET_AUTH_TOKEN_SUCCESS: `GET_AUTH_TOKEN_SUCCESS_${itemId}`,
  GET_AUTH_TOKEN_FAILURE: `GET_AUTH_TOKEN_FAILURE_${itemId}`,
  POST_AUTO_RESIZE: `POST_AUTO_RESIZE_${itemId}`,
});

// matches DEBOUNCE_TIME_AUTORESIZE in graasp-apps-query-client/src/config/constants.ts
const AUTORESIZE_DEBOUNCE_MS = 150;

// If the parent window never answers the handshake (not actually embedded
// in a Graasp iframe, wrong origin, parent doesn't implement this protocol,
// message dropped, ...) neither `graasp_context` nor `graasp_context_error`
// would otherwise ever fire, leaving the "Connecting to Graasp…" status
// stuck forever. This bounds the wait so the LiveView always reaches
// `:error` and can show a retry option instead of hanging.
const HANDSHAKE_TIMEOUT_MS = 10_000;

const debounce = (fn, ms) => {
  let timer;
  const debounced = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
};

const parseMessage = (event) => {
  if (typeof event.data !== "string") return null;
  try {
    return JSON.parse(event.data);
  } catch (_e) {
    return null;
  }
};

const postToParent = (payload) => {
  try {
    window.parent.postMessage(JSON.stringify(payload), "*");
  } catch (_e) {
    window.parent.postMessage(JSON.stringify(payload));
  }
};

const GraaspAppContext = {
  mounted() {
    this.connect();
  },

  // On a socket reconnect (network blip, tab backgrounded, heartbeat
  // timeout, ...) LiveView spins up a brand new server-side process and
  // `mount/3` runs again, resetting `:status` to `:awaiting_context` — but
  // this hooked element (`id="graasp-app-context"`) isn't recreated since it
  // persists across the patch, so `mounted()` does NOT fire again. Without
  // redoing the handshake here, the UI would flip back to "Connecting to
  // Graasp…" after already having loaded, and hang there forever since
  // nothing would ever re-trigger it.
  reconnected() {
    this.cleanup();
    this.connect();
  },

  connect() {
    const itemId = this.el.dataset.itemId;
    const appKey = this.el.dataset.appKey;
    if (!itemId) return;

    const keys = buildKeys(itemId);

    this._contextTimeout = setTimeout(() => {
      window.removeEventListener("message", this._onContextMessage);
      this.pushEvent("graasp_context_error", { reason: "context_timeout" });
    }, HANDSHAKE_TIMEOUT_MS);

    this._onContextMessage = (event) => {
      const parsed = parseMessage(event);
      if (!parsed) return;
      const { type, payload } = parsed;

      if (type === keys.GET_CONTEXT_SUCCESS) {
        clearTimeout(this._contextTimeout);
        window.removeEventListener("message", this._onContextMessage);
        const port = event.ports[0];
        this.requestAuthToken(port, keys, appKey, payload);
      } else if (type === keys.GET_CONTEXT_FAILURE) {
        clearTimeout(this._contextTimeout);
        window.removeEventListener("message", this._onContextMessage);
        this.pushEvent("graasp_context_error", { reason: "context" });
      }
    };

    window.addEventListener("message", this._onContextMessage);
    postToParent({
      type: keys.GET_CONTEXT,
      payload: { key: appKey, origin: window.location.origin },
    });
  },

  requestAuthToken(port, keys, appKey, context) {
    this._port = port;
    this._tokenTimeout = setTimeout(() => {
      port.onmessage = null;
      this.pushEvent("graasp_context_error", { reason: "token_timeout" });
    }, HANDSHAKE_TIMEOUT_MS);

    port.onmessage = (event) => {
      const parsed = parseMessage(event);
      if (!parsed) return;
      const { type, payload } = parsed;

      if (type === keys.GET_AUTH_TOKEN_SUCCESS) {
        clearTimeout(this._tokenTimeout);
        this.pushEvent("graasp_context", { context, token: payload.token });
        this.startAutoResize(port, keys);
      } else if (type === keys.GET_AUTH_TOKEN_FAILURE) {
        clearTimeout(this._tokenTimeout);
        this.pushEvent("graasp_context_error", { reason: "token" });
      }
    };

    port.postMessage(
      JSON.stringify({
        type: keys.GET_AUTH_TOKEN,
        payload: { key: appKey, origin: window.location.origin },
      }),
    );
  },

  // Mirrors `useAutoResize` in graasp-apps-query-client's postMessage.ts:
  // reports the document's height to the parent over the same port
  // whenever it changes, so the parent can size the iframe to fit. Our
  // content deliberately has no fixed/viewport height — this message is
  // what lets the parent do the sizing instead of us clipping/scrolling
  // internally.
  startAutoResize(port, keys) {
    const sendHeight = debounce((height) => {
      port.postMessage(
        JSON.stringify({ type: keys.POST_AUTO_RESIZE, payload: height }),
      );
    }, AUTORESIZE_DEBOUNCE_MS);

    // useEffect runs after the first render in the React app too — send the
    // current height immediately since the host is otherwise never told the
    // initial size.
    sendHeight(document.body.scrollHeight);

    const resizeObserver = new ResizeObserver(() => {
      sendHeight(document.body.scrollHeight);
    });
    resizeObserver.observe(document.body);

    this._resizeObserver = resizeObserver;
    this._sendHeight = sendHeight;
  },

  cleanup() {
    clearTimeout(this._contextTimeout);
    clearTimeout(this._tokenTimeout);
    if (this._onContextMessage) {
      window.removeEventListener("message", this._onContextMessage);
    }
    if (this._port) {
      this._port.onmessage = null;
    }
    this._resizeObserver?.disconnect();
    this._sendHeight?.cancel();
  },

  destroyed() {
    this.cleanup();
  },
};

export default GraaspAppContext;
