import { Middleware, MiddlewareFunctionParams } from './../decorators/MiddlewareConfig';
import { ProtonMiddleware } from './ProtonMiddleware';
import * as bodyParser from 'body-parser';
import * as express from 'express';

export class JsonContentMiddleware extends ProtonMiddleware {

    @Middleware()
    jsonContentMiddlewareFunc(params: MiddlewareFunctionParams) {
        params.res.header('Content-type', 'application/json');
        this.configureJsonProperties(params.app.getExpress());
        params.next();
    }

    configMiddlewares() {
        this.configureJsonProperties(this.express);
    }

    configureJsonProperties(express: express.Application) {
        this.express.set("json spaces", 2);
        this.express.use(bodyParser.json());
        this.express.use((req, res, next) => {
            delete req.body.id;
            next();
        });
    }
}