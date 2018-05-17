import 'reflect-metadata';
import Express from 'express';
import { DBConnector } from '../database/DBConnector';
import { BaseMiddleware } from '../middlewares/BaseMiddleware';
import { BaseRouter } from '../router/BaseRouter';
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
    connectDB(): Promise<any>;
    private startServers();
    private startServer(port, useHttps);
    private loadConfig(config?);
    /**
     * Configure global Middlewares. Application scope
     */
    private configMiddlewares();
    /**
     * Initialize all configured routes annotated with @Route
     */
    private configureRoutes();
    private createRoutesByMethod(routeConfig, router, routerMiddlewares);
    private createRouterFunctionParams(req, res, app);
    private createMiddlewareFunctionParams(req, res, next, app);
    withDBConnector(dbConnector: DBConnector<any, any>): this;
    withDBConnectorAs(dbConnector: {
        new (...args: any[]);
    }): this;
    withConfig(config: any): this;
    /**
     * Configures the Route Scope Middlewares
     */
    private configRouteMiddlewares(config);
    /**
     *  Configures the Router Scope Middlewares
     */
    private configRouterMiddlewares(router);
    private getExpressMiddlewaresList(BaseMiddlewares);
    /**
     * Add Router to application
     * @param router Router implementation
     */
    addRouter(router: BaseRouter): this;
    addRouterAs(router: {
        new (...args: any[]);
    }): this;
    /**
     * Add Global Middleware. A middleware added here, will act for all routers of the application
     * @param middleware Middleware implementation
     */
    addMiddleware(middleware: BaseMiddleware): this;
    addMiddlewareAs(middleware: {
        new (...args: any[]);
    }): this;
    /**
     * Return a express instance
     * @see {@link http://expressjs.com/en/4x/api.html}
     */
    getExpress(): Express.Application;
    /**
     * Return a list of Confugured routers
     */
    getRouters(): BaseRouter[];
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
