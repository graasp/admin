import { Context } from '@graasp/sdk';

export class ClientManager {
  private static INSTANCE: ClientManager | null;
  private host: URL;
  private clientHosts = new Map<Context, URL>();
  private clientPrefix = new Map<Context, string>();

  private constructor() {
    try {
      this.host = new URL(window.location.href);
    } catch {
      this.host = new URL('http://mock.graasp.org');
    }
  }

  public static getInstance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new ClientManager();
    }
    return this.INSTANCE;
  }

  public setHost(host: URL) {
    this.host = host;
    return this;
  }

  public addHost(context: Context, host: URL) {
    if (this.clientHosts.has(context)) {
      throw new Error(
        `The given context '${context}' is already present in the hosts.`,
      );
    }

    this.clientHosts.set(context, host);
    return this;
  }

  public getPrefix(context: Context) {
    const prefix = this.clientPrefix.get(context);

    if (prefix !== undefined) {
      return prefix;
    }

    throw new Error(
      `The given context '${context}' is not present in the prefix.`,
    );
  }

  public addPrefix(context: Context, prefix: string) {
    if (this.clientPrefix.has(context)) {
      throw new Error(
        `The given context '${context}' is already present in the prefix.`,
      );
    }

    this.clientPrefix.set(context, prefix);
    return this;
  }

  public getHostAndPrefix(context: Context) {
    const prefix = this.getPrefix(context);

    // create new URL to keep current host map immutable
    return { host: new URL(this.host), prefix };
  }

  public getItemAsURL(
    context: Context,
    itemId: string,
    qs: { [key: string]: string | number | boolean } = {},
  ) {
    // make a copy of the host
    let host = new URL(this.host.toString());
    if (context === Context.Library) {
      const libraryHost = this.clientHosts.get(context);
      if (libraryHost) {
        host = libraryHost;
      } else {
        throw new Error('Library host used before it was defined.');
      }
    }
    const prefix = this.getPrefix(context);
    const url =
      context === Context.Player
        ? new URL(`${prefix}/${itemId}/${itemId}`, host.origin)
        : new URL(`${prefix}/${itemId}`, host.origin);

    for (const [k, v] of Object.entries(qs)) {
      url.searchParams.set(k, v.toString());
    }

    return url;
  }

  public getItemLink(
    context: Context,
    itemId: string,
    qs?: { [key: string]: string | number | boolean },
  ) {
    return this.getItemAsURL(context, itemId, qs).toString();
  }
}
