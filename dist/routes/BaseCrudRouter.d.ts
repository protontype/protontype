import { ExpressRouter } from "../routes/ExpressRouter";
import { BaseModel } from "../models/BaseModel";
/**
 * Created by beto_ on 14/08/2016.
 */
export declare abstract class BaseCrudRouter extends ExpressRouter {
    constructor();
    private addRoute(baseUrl, endpoint, method, routeFunction);
    findAll(req: any, res: any, model: BaseModel): void;
    create(req: any, res: any, model: BaseModel): void;
    findOne(req: any, res: any, model: BaseModel): void;
    update(req: any, res: any, model: BaseModel): void;
    destroy(req: any, res: any, model: BaseModel): void;
}
