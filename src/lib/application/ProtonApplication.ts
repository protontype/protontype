import { MiddlewareFunctionParams } from './../decorators/MiddlewareConfig';
import { RouterFunctionParams } from './../decorators/RouteConfig';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { DefaultMiddleware } from '../middlewares/DefaultMiddleware';
import { ProtonMiddleware } from '../middlewares/ProtonMiddleware';
import { BaseModel } from '../models/BaseModel';
import { ExpressRouter } from '../router/ExpressRouter';
import { Method } from '../router/Method';
import { RouteConfig } from '../decorators/RouteConfig';
import { Logger } from './Logger';
import { DEFAULT_CONFIG, GlobalConfig, ProtonConfigLoader } from './ProtonConfigLoader';
import { ProtonDB } from './ProtonDB';
import { ProtonModelConfig } from '../decorators/ProtonModelConfig';
import * as Express from 'express';
import * as fs from 'fs';
import * as https from 'https';
import * as winston from 'winston';

/**
 * @author Humberto Machado
 * Protontype main class. Configure and start Routers, Middlewares and bootstrap application
 */
export class ProtonApplication {
    private express: Express.Application;
    private middlewares: ProtonMiddleware[] = [];
    private protonDB: ProtonDB;
    private routers: ExpressRouter[] = [];
    private authMiddleware: AuthMiddleware;
    private config: GlobalConfig;
    private logger: winston.LoggerInstance;

    /**
     * Create Protontype aplication
     */
    constructor(config?: GlobalConfig) {
        this.config = this.loadConfig(config);
        this.logger = Logger.createLogger(this.config.logger);
        this.express = Express();
        this.protonDB = new ProtonDB(this.config.database).loadModels();
    }

    /**
     * Start up Protontype application.
     * @return express instance
     */
    public bootstrap(): Promise<ProtonApplication> {
        return new Promise<ProtonApplication>((resolve, reject) => {
            this.configMiddlewares();
            this.protonDB.start().then(() => {
                this.configureRoutes();
                this.startServer(this.config);
                resolve(this);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    private startServer(config: GlobalConfig): void {
        let port: number = this.config.port;
        this.express.set("port", port);
        if (config.https && config.https.enabled) {
            const credentials = {
                key: fs.readFileSync(config.https.key),
                cert: fs.readFileSync(config.https.cert)
            }
            https.createServer(credentials, this.express)
                .listen(port, () => this.logger.info(`Application listen port ${port} (HTTPS)`));
        } else {
            this.express.listen(port, () => this.logger.info(`Application listen port ${port} (HTTP)`));
        }
    }

    private loadConfig(config?: GlobalConfig): GlobalConfig {
        if (config) {
            return config;
        } else {
            config = ProtonConfigLoader.loadConfig();
            if (!config) {
                config = DEFAULT_CONFIG;
            }
            return config;
        }
    }

    /**
     * Configure global Middlewares. Application scope
     */
    private configMiddlewares(): void {
        new DefaultMiddleware().init(this).configMiddlewares();
        this.middlewares.forEach(middleware => {
            middleware.init(this);
            middleware.configMiddlewares();
            this.express.use((req, res, next) => 
                middleware.middlewareFuntion.call(middleware, this.createMiddlewareFunctionParams(req, res, next, this.getModel(middleware.modelName), this)));
        });
    }

    /**
     * Initialize all configured routes annotated with @Route
     */
    private configureRoutes(): void {
        this.routers.forEach(router => {
            router.init(this);
            var configs: RouteConfig[] = router.getRouteConfigs();

            if (configs != null) {
                configs.forEach(config => {
                    if (config.method != null && config.endpoint != null) {
                        this.createRoutesByMethod(config, router);
                    } else {
                        config.routeFunction.call(router);
                    }
                });
            }
        });
    }

    private createRoutesByMethod(config: RouteConfig, router: ExpressRouter): void {
        switch (config.method) {
            case Method.GET:
                this.express.get(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method.POST:
                this.express.post(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.configRouteMiddlewares(config, router), (req, res) => {
                        config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                    });
                break;
            case Method.PUT:
                this.express.put(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method.DELETE:
                this.express.delete(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method.PATCH:
                this.express.patch(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method.OPTIONS:
                this.express.options(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
            case Method.HEAD:
                this.express.head(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth),  this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this.getModel(config.modelName), this));
                });
                break;
        }
    }

    private createRouterFunctionParams(req: Express.Request, res: Express.Response,
        model: BaseModel<any>, app: ProtonApplication): RouterFunctionParams {
        return { req: req, res: res, model: model, app: app }
    }

    private createMiddlewareFunctionParams(req: Express.Request, res: Express.Response,
        next: Express.NextFunction, model: BaseModel<any>, app: ProtonApplication): MiddlewareFunctionParams {
        return { req: req, res: res, next: next, model: model, app: app }
    }

   /**
    * Add Authentication Middleware

    * @param authMiddleware AuthMiddleware implementation
    */
    public withAuthMiddleware(authMiddleware: AuthMiddleware): this {
        this.authMiddleware = authMiddleware;
        this.authMiddleware.init(this).configMiddlewares();
        return this;
    }

    /**
     * Used to route autentication.
     */
    private authenticate(useAuth: boolean): Express.Handler {
        if (this.authMiddleware != null && useAuth) {
            return this.authMiddleware.authenticate();
        } else {
            return (req, res, next) => next();
        }
    }

    /**
     * Configures the Route Scope Middlewares and Router Scope Middlewares
     * 
     * @param config 
     * @param router 
     */
    private configRouteMiddlewares(config: RouteConfig, router: ExpressRouter): Express.Handler[] {
        let middlewares: Express.Handler[] = [];
        let protonMiddlewares: ProtonMiddleware[] = router.getRouterMiddlewares().concat(config.middlewares);
        if (protonMiddlewares) {
            protonMiddlewares.forEach(middleware => {
                if (middleware && middleware.middlewareFuntion) {
                    middleware.init(this);
                    middleware.configMiddlewares();
                    middlewares.push((req, res, next) => {
                        middleware.middlewareFuntion.call(middleware, this.createMiddlewareFunctionParams(req, res, next, this.getModel(middleware.modelName), this));
                    });
                } else {
                    middlewares.push((req, res, next) => { next() });
                }
            })
        } else {
            middlewares.push((req, res, next) => { next() });
        }
        return middlewares;
    }

    /**
     * Add Router to application
     * @param router Router implementation
     */
    public addRouter(router: ExpressRouter): this {
        this.routers.push(router);
        return this;
    }

    /**
     * Add Global Middleware. A middleware added here, will act for all routers of the application
     * @param middleware Middleware implementation
     */
    public addMiddleware(middleware: ProtonMiddleware): this {
        this.middlewares.push(middleware);
        return this;
    }

    /**
     * Return a express instance 
     * @see {@link http://expressjs.com/en/4x/api.html}
     */
    public getExpress(): Express.Application {
        return this.express;
    }

    /**
     * Return a ProtonDB instance. This object provides database acess and Models
     */
    public getProtonDB(): ProtonDB {
        return this.protonDB;
    }

    /**
     * Return a instance of model by name
     * @param modelName Model name, defined in {@link @Model()} decotator
     */
    public getModel<T extends BaseModel<any>>(modelName: string): T {
        return <T>this.protonDB.getModel(modelName);
    }

    /**
     * Return a list of Confugured routers 
     */
    public getRouters(): ExpressRouter[] {
        return this.routers;
    }

    /**
     * Return {@link GlobalConfig} object. Content of proton.json file
     */
    public getConfig(): GlobalConfig {
        return this.config;
    }

    /**
     * @return list of all endpoints loaded in ProtonApplication
     */
    public getRoutesList(): { method: string, path: string }[] {
        let routeList: any[] = [];
        this.express._router.stack.forEach(r => {
            if (r.route && r.route.path) {
                routeList.push({
                    method: r.route.stack[0].method.toUpperCase(),
                    path: r.route.path
                });
            }
        });
        this.routers.forEach(router => {
            router.getRouter().stack.forEach(r => {
                if (r.route && r.route.path) {
                    routeList.push({
                        method: r.route.stack[0].method.toUpperCase(),
                        path: router.getBaseUrl() + r.route.path
                    });
                }
            });
        });
        return routeList;
    }
}
