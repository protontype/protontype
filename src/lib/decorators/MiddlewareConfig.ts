import { ProtonApplication } from './../application/ProtonApplication';
import { ProtonMiddleware } from '../middlewares/ProtonMiddleware';
import * as express from 'express';
import { BaseModel } from "../models/BaseModel";

export function Middleware(config?: { modelName: string; }) {
    return function (target: ProtonMiddleware, propertyKey: string, descriptor: PropertyDescriptor) {
        target.middlewareFuntion = descriptor.value;
        if (config) {
            target.modelName = config.modelName;
        }
    };
}

export interface MiddlewareFunctionParams {
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    model: BaseModel<any>,
    app: ProtonApplication
}