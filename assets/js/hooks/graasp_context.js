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
    const itemId = this.el.dataset.itemId;
    const appKey = this.el.dataset.appKey;
    if (!itemId) return;

    const keys = buildKeys(itemId);

    const onContextMessage = (event) => {
      const parsed = parseMessage(event);
      if (!parsed) return;
      const { type, payload } = parsed;

      if (type === keys.GET_CONTEXT_SUCCESS) {
        window.removeEventListener("message", onContextMessage);
        const port = event.ports[0];
        this.requestAuthToken(port, keys, appKey, payload);
      } else if (type === keys.GET_CONTEXT_FAILURE) {
        window.removeEventListener("message", onContextMessage);
        this.pushEvent("graasp_context_error", { reason: "context" });
      }
    };

    window.addEventListener("message", onContextMessage);
    postToParent({
      type: keys.GET_CONTEXT,
      payload: { key: appKey, origin: window.location.origin },
    });
  },

  requestAuthToken(port, keys, appKey, context) {
    port.onmessage = (event) => {
      const parsed = parseMessage(event);
      if (!parsed) return;
      const { type, payload } = parsed;

      if (type === keys.GET_AUTH_TOKEN_SUCCESS) {
        this.pushEvent("graasp_context", { context, token: payload.token });
        this.startAutoResize(port, keys);
      } else if (type === keys.GET_AUTH_TOKEN_FAILURE) {
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
  //
  // Driven two ways:
  //   1. `updated()` (a Phoenix hook lifecycle callback) — fires on every
  //      LiveView-initiated DOM patch on this element (new messages,
  //      streaming deltas, the settings panel opening/closing...), which
  //      covers virtually all real content changes here directly, without
  //      depending on ResizeObserver actually firing for them.
  //   2. `ResizeObserver` on `document.body` — a secondary catch-all for
  //      layout changes LiveView didn't directly cause (web font loading,
  //      image loads, window resizes).
  startAutoResize(port, keys) {
    const sendHeight = debounce((height) => {
      console.log("[GraaspAppContext] sending POST_AUTO_RESIZE height:", height);
      port.postMessage(JSON.stringify({ type: keys.POST_AUTO_RESIZE, payload: height }));
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

  updated() {
    this._sendHeight?.(document.body.scrollHeight);
  },

  destroyed() {
    this._resizeObserver?.disconnect();
    this._sendHeight?.cancel();
  },
};

export default GraaspAppContext;
