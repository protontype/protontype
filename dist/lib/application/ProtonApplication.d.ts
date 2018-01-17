import 'reflect-metadata';
import * as Express from 'express';
import { DBConnector } from '../database/DBConnector';
import { ProtonMiddleware } from '../middlewares/ProtonMiddleware';
import { ExpressRouter } from '../router/ExpressRouter';
import { GlobalConfig } from './ProtonConfigLoader';
/**
 * @author Humberto Machado
 * Protontype main class. Configure and start Routers, Middlewares and bootstrap application
 */
export declare class ProtonApplication {
    private express;
    private middlewares;
    private routers;
    private config;
    private logger;
    private dbConnector;
    /**
     * Create Protontype aplication
     */
    constructor(config?: GlobalConfig);
    /**
     * Start up Protontype application.
     * @return express instance
     */
    start(): Promise<ProtonApplication>;
    /**
     * Start up Protontype application.
     * @deprecated use start()
     * @return express instance
     */
    bootstrap(): Promise<ProtonApplication>;
    private connectDB();
    private startServer(config);
    private loadConfig(config?);
    /**
     * Configure global Middlewares. Application scope
     */
    private configMiddlewares();
    /**
     * Initialize all configured routes annotated with @Route
     */
    private configureRoutes();
    private createRoutesByMethod(config, router);
    private createRouterFunctionParams(req, res, app);
    private createMiddlewareFunctionParams(req, res, next, app);
    withDBConnector(dbConnector: DBConnector<any, any>): this;
    /**
     * Configures the Route Scope Middlewares and Router Scope Middlewares
     *
     * @param config
     * @param router
     */
    private configRouteMiddlewares(config, router);
    /**
     * Add Router to application
     * @param router Router implementation
     */
    addRouter(router: ExpressRouter): this;
    /**
     * Add Global Middleware. A middleware added here, will act for all routers of the application
     * @param middleware Middleware implementation
     */
    addMiddleware(middleware: ProtonMiddleware): this;
    /**
     * Return a express instance
     * @see {@link http://expressjs.com/en/4x/api.html}
     */
    getExpress(): Express.Application;
    /**
     * Return a list of Confugured routers
     */
    getRouters(): ExpressRouter[];
    /**
     * Return {@link GlobalConfig} object. Content of proton.json file
     */
    getConfig(): GlobalConfig;
    /**
     * @return list of all endpoints loaded in ProtonApplication
     */
    getRoutesList(): {
        method: string;
        path: string;
    }[];
}
