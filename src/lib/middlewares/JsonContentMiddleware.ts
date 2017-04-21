import { Middleware, MiddlewareFunctionParams } from './../decorators/MiddlewareConfig';
import { ProtonMiddleware } from './ProtonMiddleware';
import * as bodyParser from 'body-parser';

export class JsonContentMiddleware extends ProtonMiddleware {

    @Middleware()
    jsonContentMiddlewareFunc(params: MiddlewareFunctionParams) {
        params.app.getExpress().set("json spaces", 2);
        params.app.getExpress().use(bodyParser.json());
        params.app.getExpress().use((req, res, next) => {
            delete req.body.id;
            next();
        });
        params.next();
    }
}