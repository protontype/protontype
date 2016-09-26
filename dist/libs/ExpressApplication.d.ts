/// <reference types="express" />
import { SequelizeDB } from "./SequelizeDB";
import * as Express from "express";
import { ExpressRouter } from "../routes/ExpressRouter";
import { Middleware } from "../middlewares/Middleware";
import { SequelizeModel } from "../models/SequelizeModel";
/**
 * @author Humberto Machado
 */
export declare class ExpressApplication {
    private express;
    private middlewares;
    private sequelizeDB;
    private routers;
    /**
     * Create express application instance and middlewares
     */
    constructor();
    /**
     * Initialize express application and load middlewares
     * @return express instance
     */
    bootstrap(): Express.Application;
    addRouter(router: ExpressRouter): this;
    addMiddleware(middleware: Middleware): this;
    private configureRoutes();
    private createRoutesByMethod(config, router);
    private configMiddlewares();
    getRoutesList(): {
        method: string;
        path: string;
    }[];
    getExpress(): Express.Application;
    getSequelizeDB(): SequelizeDB;
    getModel(modelName: string): SequelizeModel;
    getRouters(): ExpressRouter[];
}
