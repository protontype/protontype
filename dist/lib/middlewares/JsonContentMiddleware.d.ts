import { MiddlewareFunctionParams } from './../decorators/MiddlewareConfig';
import { BaseMiddleware } from './BaseMiddleware';
export declare class JsonContentMiddleware extends BaseMiddleware {
    private pretty;
    constructor(pretty?: boolean);
    jsonContentMiddlewareFunc(params: MiddlewareFunctionParams): void;
}
