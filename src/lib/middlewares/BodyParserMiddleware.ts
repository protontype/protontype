import { ProtonMiddleware } from "./ProtonMiddleware";
import { Middleware, MiddlewareFunctionParams } from "../decorators/MiddlewareConfig";

export class BodyParserMiddleware extends ProtonMiddleware {
    @Middleware()
    public bodyParser(params: MiddlewareFunctionParams): void {
        if (params.req.body == undefined || params.req.body == null) {
            var data = '';
            params.req.setEncoding('utf8');
            params.req.on('data', (rawData) => data += rawData);

            params.req.on('end', () => {
                params.req.body = data;
                params.next();
            });
        } else {
            params.next();
        }
    }
}