import { BaseModel } from '../models/BaseModel';
import { ExpressRouter } from '../routes/ExpressRouter';
/**
 * Created by beto_ on 14/08/2016.
 */
export declare abstract class BaseCrudRouter extends ExpressRouter {
    private useAuth;
    constructor();
    private addRoute(baseUrl, endpoint, method, routeFunction, useAuth);
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
export declare function UseAuth(): (constructor: Function) => void;
