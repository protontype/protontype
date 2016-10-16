import { BaseModel } from '../models/BaseModel';
import { ExpressApplication } from './../libs/ExpressApplication';
import { RouteConfig } from './../libs/RouteConfig';
import * as Express from 'express';
/**
 * @author Humberto Machado
 * Express routes configurations
 */
export declare abstract class ExpressRouter {
    protected express: Express.Application;
    protected expressApplication: ExpressApplication;
    protected router: Express.Router;
    protected routeConfgs: RouteConfig[];
    protected baseUrl: string;
    protected modelInstances: BaseModel<any>[];
    constructor();
    init(expressApplication: ExpressApplication): void;
    getBaseUrl(): string;
    getModelInstances(): BaseModel<any>[];
    sendErrorMessage(res: any, error: any): void;
    getModel<T extends BaseModel<any>>(modelName: string): T;
    getRouter(): Express.Router;
    getRouteConfigs(): RouteConfig[];
    addRouteConfig(config: RouteConfig): void;
}
export interface RouteFunctionParams {
    request: any;
    response: any;
    model: any;
}
