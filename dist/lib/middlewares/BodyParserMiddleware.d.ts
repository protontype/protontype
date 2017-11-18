import { ProtonMiddleware } from "./ProtonMiddleware";
import { MiddlewareFunctionParams } from "../decorators/MiddlewareConfig";
export declare class BodyParserMiddleware extends ProtonMiddleware {
    bodyParser(params: MiddlewareFunctionParams): void;
}
