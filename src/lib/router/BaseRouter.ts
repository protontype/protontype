import { BaseMiddleware } from '../middlewares/BaseMiddleware';
import { Logger } from './../application/Logger';
import winston from 'winston';
import { ProtonApplication } from './../application/ProtonApplication';
import { RouteConfig } from '../decorators/RouteConfig';
import Express from 'express';
/**
 * @author Humberto Machado
 * Express routes configurations
 */
export abstract class BaseRouter {
    protected express: Express.Application;
    protected protonApplication: ProtonApplication;
    protected router: Express.Router;
    protected routeConfgs: RouteConfig[];
    protected baseUrl: string;
    protected routerMiddlewares: BaseMiddleware[];
    private logger: winston.LoggerInstance = Logger.instance;
    
    public init(protonApplication: ProtonApplication): void {
        this.express = protonApplication.getExpress();
        this.router = Express.Router();
        this.express.use(this.getBaseUrl(), this.router);
        this.protonApplication = protonApplication;
        this.logger.info(`>>>> Configured routes to ${this.getBaseUrl()} <<<<`);
    }

    public getBaseUrl(): string {
        return this.baseUrl;
    }

    public sendErrorMessage(res: any, error: any): void {
        res.status(412).json({ msg: error.message })
    }

    public getRouter(): Express.Router {
        return this.router;
    }

    public getRouteConfigs(): RouteConfig[] {
        return this.routeConfgs;
    }

    public addRouteConfig(config: RouteConfig) {
        if (this.routeConfgs == null) {
            this.routeConfgs = [];
        }
        if (this.routeConfgs.filter(route => route.method == config.method && route.endpoint == config.endpoint).length == 0) {
            this.routeConfgs.push(config);
        }
    }

    public getRouterMiddlewares(): BaseMiddleware[] {
        return this.routerMiddlewares;
    }
}