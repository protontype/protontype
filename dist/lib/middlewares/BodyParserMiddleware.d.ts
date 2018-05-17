import { BaseMiddleware } from "./BaseMiddleware";
import { MiddlewareFunctionParams } from "../decorators/MiddlewareConfig";
export declare class BodyParserMiddleware extends BaseMiddleware {
    bodyParser(params: MiddlewareFunctionParams): void;
}
