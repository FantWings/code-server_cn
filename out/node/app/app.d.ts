/// <reference types="node" />
import * as http from "http";
import { HttpProvider, HttpProviderOptions, HttpResponse, Route } from "../http";
import { ApiHttpProvider } from "./api";
/**
 * App/fallback HTTP provider.
 */
export declare class AppHttpProvider extends HttpProvider {
    private readonly api;
    constructor(options: HttpProviderOptions, api: ApiHttpProvider);
    handleRequest(route: Route, request: http.IncomingMessage): Promise<HttpResponse>;
    getAppRoot(route: Route, name: string, sessionId: string): Promise<HttpResponse>;
}
