import { ProtonMiddleware } from '../middlewares/ProtonMiddleware';
import { ProtonApplication } from './../application/ProtonApplication';
import { RouteConfig } from '../decorators/RouteConfig';
import * as Express from 'express';
/**
 * @author Humberto Machado
 * Express routes configurations
 */
export declare abstract class ExpressRouter {
    protected express: Express.Application;
    protected protonApplication: ProtonApplication;
    protected router: Express.Router;
    protected routeConfgs: RouteConfig[];
    protected baseUrl: string;
    protected routerMiddlewares: ProtonMiddleware[];
    private logger;
    init(protonApplication: ProtonApplication): void;
    getBaseUrl(): string;
    sendErrorMessage(res: any, error: any): void;
    getRouter(): Express.Router;
    getRouteConfigs(): RouteConfig[];
    addRouteConfig(config: RouteConfig): void;
    getRouterMiddlewares(): ProtonMiddleware[];
}
