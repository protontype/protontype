import { ExpressApplication } from './../libs/ExpressApplication';
import { BaseModel } from "../models/BaseModel";
import * as Express from "express";
/**
 * @author Humberto Machado
 * Express routes configurations
 */
export declare abstract class ExpressRouter {
    protected express: Express.Application;
    protected expressApplication: ExpressApplication;
    protected router: Express.Router;
    constructor();
    init(expressApplication: ExpressApplication): void;
    abstract getBaseUrl(): string;
    abstract getModelInstances(): BaseModel[];
    sendErrorMessage(res: any, error: any): void;
    getModel<T extends BaseModel>(modelName: string): T;
    getRouter(): Express.Router;
}
export declare function Router(config?: RouterConfig): (constructor: Function) => void;
export interface RouterConfig {
    baseUrl: string;
}
export interface RouteFunctionParams {
    request: any;
    response: any;
    model: any;
}
