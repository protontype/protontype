import { ExpressRouter } from "../routes/ExpressRouter";
import { SequelizeModel } from "../models/SequelizeModel";
/**
 * Created by beto_ on 14/08/2016.
 */
export declare abstract class BaseCrudRouter extends ExpressRouter {
    constructor();
    private addRoute(baseUrl, endpoint, method, routeFunction);
    findAll(req: any, res: any, model: SequelizeModel): void;
    create(req: any, res: any, model: SequelizeModel): void;
    findOne(req: any, res: any, model: SequelizeModel): void;
    update(req: any, res: any, model: SequelizeModel): void;
    destroy(req: any, res: any, model: SequelizeModel): void;
}
