import { MiddlewareFunctionParams } from './../decorators/MiddlewareConfig';
import { ProtonMiddleware } from './ProtonMiddleware';
import express from 'express';
export declare class JsonContentMiddleware extends ProtonMiddleware {
    jsonContentMiddlewareFunc(params: MiddlewareFunctionParams): void;
    configMiddlewares(): void;
    configureJsonProperties(express: express.Application): void;
}
