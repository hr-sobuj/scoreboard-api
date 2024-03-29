import type { RequestHandler } from "express";

export interface RouteItem {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    controller: RequestHandler[] | any[];
}