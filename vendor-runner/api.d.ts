export declare class ApiError extends Error {
    readonly status: number;
    readonly body: any;
    constructor(message: string, status: number, body: any);
}
/** The request never reached the server: no network, a tunnel, a phone switching cells. */
export declare function isOffline(err: unknown): boolean;
/** A body as JSON; one that is not (a proxy's error page) as `{ error: <the text> }`. */
export declare function safeJson(text: string): any;
export interface Api {
    get<T>(path: string): Promise<T>;
    post<T>(path: string, body?: unknown): Promise<T>;
    put<T>(path: string, body?: unknown): Promise<T>;
    patch<T>(path: string, body?: unknown): Promise<T>;
    del<T>(path: string): Promise<T>;
    upload<T>(path: string, file: File): Promise<T>;
}
/**
 * JSON calls with the host's credentials; a refused call throws an `ApiError` with the server's
 * `error` and its body (`fields`, `issues`, a `code`).
 */
export declare function createApi(withBase: (path: string) => string, headers?: Record<string, string>, 
/** Told of every answer of 500 and above, e.g. to send it to the host's log. */
onServerError?: (line: string) => void): Api;
