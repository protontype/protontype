import { MiddlewareFunctionParams } from './../decorators/MiddlewareConfig';
import { ProtonMiddleware } from './ProtonMiddleware';
export declare class JsonContentMiddleware extends ProtonMiddleware {
    jsonContentMiddlewareFunc(params: MiddlewareFunctionParams): void;
}
