import { BaseModel } from '../models/BaseModel';
import { ExpressRouter } from '../router/ExpressRouter';
import { ExpressApplication } from './../application/ExpressApplication';
/**
 * Created by beto_ on 14/08/2016.
 */
export declare abstract class BaseCrudRouter extends ExpressRouter {
    private useAuth;
    init(expressApplication: ExpressApplication): void;
    private addRoute(endpoint, method, routeFunction, useAuth);
    findAll(req: any, res: any, model: BaseModel<any>): void;
    create(req: any, res: any, model: BaseModel<any>): void;
    findOne(req: any, res: any, model: BaseModel<any>): void;
    update(req: any, res: any, model: BaseModel<any>): void;
    destroy(req: any, res: any, model: BaseModel<any>): void;
}
/**
 * Decorator @UseAuth()
 *
 * Indicates that a BaseCrudRouter uses the authentication middleware
 */
export declare function UseAuth(options?: UseAuthOptions): (constructor: Function) => void;
export interface UseAuthOptions {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}
