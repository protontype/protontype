import { Middleware, MiddlewareFunctionParams } from './../decorators/MiddlewareConfig';
import { ProtonMiddleware } from './ProtonMiddleware';
import bodyParser from 'body-parser';
import express from 'express';

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
        express.set("json spaces", 2);
        express.use(bodyParser.json());
        express.use((req, res, next) => {
            delete req.body.id;
            next();
        });
    }
}