import { ProtonApplication } from './../application/ProtonApplication';
import { ProtonMiddleware } from '../middlewares/ProtonMiddleware';
import express from 'express';
export declare function Middleware(autoNext?: boolean): (target: ProtonMiddleware, propertyKey: string, descriptor: PropertyDescriptor) => void;
export interface MiddlewareFunctionParams {
    req: express.Request;
    res: express.Response;
    next: express.NextFunction;
    app: ProtonApplication;
}
