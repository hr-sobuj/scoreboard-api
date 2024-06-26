import type { Request } from "express";

export interface AuthTypes {
    username: string,
    password: string,
    role?: string,
    avatar?: string
}

export interface RequestBodyTypes extends Request {
    body: AuthTypes;
}