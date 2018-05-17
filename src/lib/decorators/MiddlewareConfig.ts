import { ProtonApplication } from './../application/ProtonApplication';
import { BaseMiddleware } from '../middlewares/BaseMiddleware';
import express from 'express';

export function Middleware(autoNext?: boolean) {
    return function (target: BaseMiddleware, propertyKey: string, descriptor: PropertyDescriptor) {
        target.middlewareFuntion = descriptor.value;
        target.autoNext = autoNext;
    };
}

export interface MiddlewareFunctionParams {
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    app: ProtonApplication
}