declare module 'live-server' {
  export interface LiveServerParams {
    /** Set the server port. Defaults to 8080. */
    port?: number;
    /**  Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP. */
    host?: string;
    /** Set root directory that's being served. Defaults to cwd. */
    root?: string;
    /** When false, it won't load your browser by default. */
    open?: boolean;
    /** Comma-separated string for paths to ignore. */
    ignore?: string;
    /** When set, serve this file (server root relative) for every 404 (useful for single-page applications). */
    file?: string;
    /** Waits for all changes, before reloading. Defaults to 0 sec. */
    wait?: number;
    /** Mount a directory to a route. */
    mount?: string[][];
    /** 0 = errors only, 1 = some, 2 = lots */
    logLevel?: number;
    /** Takes an array of Connect-compatible middleware that are injected into the server middleware stack. */
    middleware?: Function[];
  }

  export function start(params: LiveServerParams): void;
}
