import { Logger } from './../application/Logger';
import * as winston from 'winston';
import { BaseModel } from '../models/BaseModel';
import { ExpressApplication } from './../application/ExpressApplication';
import { RouteConfig } from './RouteConfig';
import * as Express from 'express';
/**
 * @author Humberto Machado
 * Express routes configurations
 */
export abstract class ExpressRouter {
    protected express: Express.Application;
    protected expressApplication: ExpressApplication;
    protected router: Express.Router;
    protected routeConfgs: RouteConfig[];
    protected baseUrl: string;
    protected modelInstances: BaseModel<any>[];
    private logger: winston.LoggerInstance = Logger.instance;

    public init(expressApplication: ExpressApplication): void {
        this.express = expressApplication.getExpress();
        this.router = Express.Router();
        this.express.use(this.getBaseUrl(), this.router);
        this.expressApplication = expressApplication;
        this.logger.info(`>>>> Configured routes to ${this.getBaseUrl()} <<<<`);
    }

    public getBaseUrl(): string {
        return this.baseUrl;
    }

    public getModelInstances(): BaseModel<any>[] {
        return this.modelInstances;
    }

    public sendErrorMessage(res: any, error: any): void {
        res.status(412).json({ msg: error.message })
    }

    public getModel<T extends BaseModel<any>>(modelName: string): T {
        return this.expressApplication.getModel<T>(modelName);
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
}

export interface RouteFunctionParams {
    request: any,
    response: any,
    model: any
}