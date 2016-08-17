import { ExpressRouter } from "../routes/ExpressRouter";
/**
 * Created by beto_ on 14/08/2016.
 */
export declare abstract class BaseCrudRouter extends ExpressRouter {
    constructor();
    private addRoute(baseUrl, endpoint, method, routeFunction);
    findAll(req: any, res: any, model: any): void;
    create(req: any, res: any, model: any): void;
    findOne(req: any, res: any, model: any): void;
    update(req: any, res: any, model: any): void;
    delete(req: any, res: any, model: any): void;
}
