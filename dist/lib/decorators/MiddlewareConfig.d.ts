import { ProtonApplication } from './../application/ProtonApplication';
import { ProtonMiddleware } from '../middlewares/ProtonMiddleware';
import * as express from 'express';
import { BaseModel } from "../models/BaseModel";
export declare function Middleware(config?: {
    modelName: string;
}): (target: ProtonMiddleware, propertyKey: string, descriptor: PropertyDescriptor) => void;
export interface MiddlewareFunctionParams {
    req: express.Request;
    res: express.Response;
    next: express.NextFunction;
    model?: BaseModel<any>;
    app: ProtonApplication;
}
