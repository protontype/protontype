/// <reference types="express" />
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Middleware } from '../middlewares/Middleware';
import { BaseModel } from '../models/BaseModel';
import { ExpressRouter } from '../router/ExpressRouter';
import { GlobalConfig } from './ProtonConfigLoader';
import { SequelizeDB } from './SequelizeDB';
import * as Express from 'express';
/**
 * @author Humberto Machado
 */
export declare class ProtonApplication {
    private express;
    private middlewares;
    private sequelizeDB;
    private routers;
    private authMiddleware;
    private config;
    private logger;
    /**
     * Create express application instance and middlewares
     */
    constructor(config?: GlobalConfig);
    /**
     * Initialize express application and load middlewares
     * @return express instance
     */
    bootstrap(): Promise<ProtonApplication>;
    private startServer(config);
    private loadConfig(config?);
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
    getModel<T extends BaseModel<any>>(modelName: string): T;
    getRouters(): ExpressRouter[];
    getConfig(): GlobalConfig;
    /**
     * @return list of all configured routes in ProtonApplication
     */
    getRoutesList(): {
        method: string;
        path: string;
    }[];
}
