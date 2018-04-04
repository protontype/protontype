import { MiddlewareFunctionParams } from './../decorators/MiddlewareConfig';
import { ProtonMiddleware } from './ProtonMiddleware';
export declare class JsonContentMiddleware extends ProtonMiddleware {
    private pretty;
    constructor(pretty?: boolean);
    jsonContentMiddlewareFunc(params: MiddlewareFunctionParams): void;
}
