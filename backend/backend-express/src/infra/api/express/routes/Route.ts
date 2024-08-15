import { Request, Response } from "express";

export default interface Route {
    getHandler(): (request: Request, response: Response) => Promise<void>;
    getPath(): string;
    getMethod(): HttpMethod;
    requireAuthentication: RequiresAuthentication;
}

export type HttpMethod = "get" | "post";

export const HttpMethod = {
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod,
    DELETE: "delete" as HttpMethod,
} as const;

export type RequiresAuthentication = true | false;

export const RequiresAuthentication = {
    REQUIRES_AUTHENTICATION: true as RequiresAuthentication,
    NOT_REQUIRES_AUTHENTICATION: false as RequiresAuthentication,
} as const;
