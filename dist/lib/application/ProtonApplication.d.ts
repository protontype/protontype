import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { ProtonMiddleware } from '../middlewares/ProtonMiddleware';
import { BaseModel } from '../models/BaseModel';
import { ExpressRouter } from '../router/ExpressRouter';
import { GlobalConfig } from './ProtonConfigLoader';
import { ProtonDB } from './ProtonDB';
import * as Express from 'express';
/**
 * @author Humberto Machado
 * Protontype main class. Configure and start Routers, Middlewares and bootstrap application
 */
export declare class ProtonApplication {
    private express;
    private middlewares;
    private protonDB;
    private routers;
    private authMiddleware;
    private config;
    private logger;
    /**
     * Create Protontype aplication
     */
    constructor(config?: GlobalConfig);
    /**
     * Start up Protontype application.
     * @return express instance
     */
    bootstrap(): Promise<ProtonApplication>;
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
    private createRouterFunctionParams(req, res, model, app);
    private createMiddlewareFunctionParams(req, res, next, model, app);
    /**
     * Add Authentication Middleware
 
     * @param authMiddleware AuthMiddleware implementation
     */
    withAuthMiddleware(authMiddleware: AuthMiddleware): this;
    /**
     * Used to route autentication.
     */
    private authenticate(useAuth);
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
     * Return a ProtonDB instance. This object provides database acess and Models
     */
    getProtonDB(): ProtonDB;
    /**
     * Return a instance of model by name
     * @param modelName Model name, defined in {@link @Model()} decotator
     */
    getModel<T extends BaseModel<any>>(modelName: string): T;
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
