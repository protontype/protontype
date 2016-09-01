import { ExpressApplication } from './../libs/ExpressApplication';
import { BaseModel } from "../models/BaseModel";
import { SequelizeModel } from "../models/SequelizeModel";
/**
 * @author Humberto Machado
 * Express routes configurations
 */
export declare abstract class ExpressRouter {
    protected express: any;
    protected expressApplication: ExpressApplication;
    constructor();
    init(expressApplication: ExpressApplication): void;
    abstract getBaseUrl(): string;
    abstract getModelInstances(): BaseModel[];
    sendErrorMessage(res: any, error: any): void;
    getModel<T extends SequelizeModel>(modelName: string): T;
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
