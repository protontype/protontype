import { ProtonApplication } from './../application/ProtonApplication';
import { BaseMiddleware } from '../middlewares/BaseMiddleware';
import express from 'express';
export declare function Middleware(autoNext?: boolean): (target: BaseMiddleware, propertyKey: string, descriptor: PropertyDescriptor) => void;
export interface MiddlewareFunctionParams {
    req: express.Request;
    res: express.Response;
    next: express.NextFunction;
    app: ProtonApplication;
}
