import { Middleware, MiddlewareFunctionParams } from './../decorators/MiddlewareConfig';
import { BaseMiddleware } from './BaseMiddleware';
import bodyParser from 'body-parser';
import express from 'express';

export class JsonContentMiddleware extends BaseMiddleware {

    constructor(private pretty?: boolean) {
        super();
    }

    @Middleware(true)
    jsonContentMiddlewareFunc(params: MiddlewareFunctionParams) {
        if (this.pretty) {
            params.app.getExpress().set("json spaces", 2);
        }
        params.res.header('Content-type', 'application/json');
    }
}