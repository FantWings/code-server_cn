/// <reference types="node" />
import * as http from "http";
import { HttpProvider, HttpResponse, Route } from "../http";
/**
 * Static file HTTP provider. Static requests do not require authentication and
 * they only allow access to resources within the application.
 */
export declare class StaticHttpProvider extends HttpProvider {
    handleRequest(route: Route, request: http.IncomingMessage): Promise<HttpResponse>;
    /**
     * Return a resource with variables replaced where necessary.
     */
    protected getReplacedResource(route: Route): Promise<HttpResponse>;
}
