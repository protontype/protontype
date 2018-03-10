import { ProtonMiddleware } from "./ProtonMiddleware";
import { Middleware, MiddlewareFunctionParams } from "../decorators/MiddlewareConfig";

export class BodyParserMiddleware extends ProtonMiddleware {
    @Middleware()
    public bodyParser(params: MiddlewareFunctionParams): void {
        var data = '';
        params.req.setEncoding('utf8');
        params.req.on('data', (rawData) => data += rawData);

        params.req.on('end', () => {
            params.req.body = data;
            params.next();
        });
    }
}