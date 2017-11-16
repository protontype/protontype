import { ProtonApplication } from './../application/ProtonApplication';
import { ProtonMiddleware } from '../middlewares/ProtonMiddleware';
import * as express from 'express';

export function Middleware() {
    return function (target: ProtonMiddleware, propertyKey: string, descriptor: PropertyDescriptor) {
        target.middlewareFuntion = descriptor.value;
    };
}

export interface MiddlewareFunctionParams {
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    app: ProtonApplication
}