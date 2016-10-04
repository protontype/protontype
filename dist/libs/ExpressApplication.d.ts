import { SequelizeDB } from "./SequelizeDB";
import * as Express from "express";
import { ExpressRouter } from "../routes/ExpressRouter";
import { Middleware } from "../middlewares/Middleware";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { BaseModel } from "../models/BaseModel";
/**
 * @author Humberto Machado
 */
export declare class ExpressApplication {
    private express;
    private middlewares;
    private sequelizeDB;
    private routers;
    private authMiddleware;
    /**
     * Create express application instance and middlewares
     */
    constructor();
    /**
     * Initialize express application and load middlewares
     * @return express instance
     */
    bootstrap(): Express.Application;
    /**
     * Initilize all configured middlewares
     */
    private configMiddlewares();
    /**
     * Initialize all configured routes annotated with @Route
     */
    private configureRoutes();
    private createRoutesByMethod(config, router);
    /**
     * Add authentication middleware implementations
     */
    withAuthMiddleware(authMiddleware: AuthMiddleware): this;
    /**
     * Used to route autentication.
     */
    private authenticate(useAuth);
    addRouter(router: ExpressRouter): this;
    addMiddleware(middleware: Middleware): this;
    getExpress(): Express.Application;
    getSequelizeDB(): SequelizeDB;
    getModel<T extends BaseModel>(modelName: string): T;
    getRouters(): ExpressRouter[];
    /**
     * @return list of all configured routes in ExpressApplication
     */
    getRoutesList(): {
        method: string;
        path: string;
    }[];
}
