/// <reference types="node" />
import * as http from "http";
import { HttpProvider, HttpProviderOptions, HttpResponse, Route } from "../http";
/**
 * Login HTTP provider.
 */
export declare class LoginHttpProvider extends HttpProvider {
    private readonly configFile;
    private readonly envPassword;
    constructor(options: HttpProviderOptions, configFile: string, envPassword: boolean);
    handleRequest(route: Route, request: http.IncomingMessage): Promise<HttpResponse>;
    getRoot(route: Route, error?: Error): Promise<HttpResponse>;
    private readonly limiter;
    /**
     * Try logging in. On failure, show the login page with an error.
     */
    private tryLogin;
    /**
     * Return a cookie if the user is authenticated otherwise throw an error.
     */
    private login;
}
