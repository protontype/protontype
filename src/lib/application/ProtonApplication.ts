import 'reflect-metadata';

import Express from 'express';
import fs from 'fs';
import https from 'https';
import winston from 'winston';

import { DBConnector, ProtonDB } from '../database/DBConnector';
import { TypeORMDBConnector } from '../database/typeorm/TypeORMDBConnector';
import { RouteConfig } from '../decorators/RouteConfig';
import { DefaultMiddleware } from '../middlewares/DefaultMiddleware';
import { ProtonMiddleware } from '../middlewares/ProtonMiddleware';
import { ExpressRouter } from '../router/ExpressRouter';
import { Method } from '../router/Method';
import { MiddlewareFunctionParams } from './../decorators/MiddlewareConfig';
import { RouterFunctionParams } from './../decorators/RouteConfig';
import { Logger } from './Logger';
import { DEFAULT_CONFIG, GlobalConfig, ProtonConfigLoader } from './ProtonConfigLoader';

/**
 * @author Humberto Machado
 * Protontype main class. Configure and start Routers, Middlewares and bootstrap application
 */
export class ProtonApplication{
    private express: Express.Application;
    private middlewares: ProtonMiddleware[] = [];
    private routers: ExpressRouter[] = [];
    private config: GlobalConfig;
    private logger: winston.LoggerInstance;
    private dbConnector: DBConnector<any, any>;

    /**
     * Create Protontype aplication
     */
    constructor(config?: GlobalConfig) {
        this.config = this.loadConfig(config);
        this.logger = Logger.createLogger(this.config.logger);
        this.express = Express();
    }

    /**
     * Start up Protontype application.
     * @return express instance
     */
    public start(port?: number, forceHttps?: boolean): Promise<ProtonApplication> {
        return new Promise<ProtonApplication>((resolve, reject) => {
            if(!ProtonDB.dbConnection) {
                this.connectDB().then(connection => {
                    ProtonDB.dbConnection = connection;
                    this.configMiddlewares();
                    this.configureRoutes();
                    this.startServer(this.config, port, forceHttps);
                    resolve(this);
                }).catch(error => reject(error));
            } else {
                this.startServer(this.config, port, forceHttps);
                resolve(this);
            }
        });
    }

    private connectDB(): Promise<any> {
        if (this.dbConnector) {
            return this.dbConnector.createConnection(this.config.database);
        } else {
            return new TypeORMDBConnector().createConnection(this.config.database);
        }
    }

    private startServer(config: GlobalConfig, forcedPort?: number, forceHttps?: boolean): void {
        let port: number = this.config.port;
        if (forcedPort) {
            port = forcedPort
        }
        if ((config.https && config.https.enabled) || forceHttps) {
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
                middleware.middlewareFuntion.call(middleware, this.createMiddlewareFunctionParams(req, res, next, this)));
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
                this.express.get(router.getBaseUrl() + config.endpoint, this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method.POST:
                this.express.post(router.getBaseUrl() + config.endpoint, this.configRouteMiddlewares(config, router), (req, res) => {
                        config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                    });
                break;
            case Method.PUT:
                this.express.put(router.getBaseUrl() + config.endpoint, this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method.DELETE:
                this.express.delete(router.getBaseUrl() + config.endpoint, this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method.PATCH:
                this.express.patch(router.getBaseUrl() + config.endpoint, this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method.OPTIONS:
                this.express.options(router.getBaseUrl() + config.endpoint, this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
            case Method.HEAD:
                this.express.head(router.getBaseUrl() + config.endpoint,  this.configRouteMiddlewares(config, router), (req, res) => {
                    config.routeFunction.call(router, this.createRouterFunctionParams(req, res, this));
                });
                break;
        }
    }

    private createRouterFunctionParams(req: Express.Request, res: Express.Response, app: ProtonApplication): RouterFunctionParams {
        return { req: req, res: res, app: app }
    }

    private createMiddlewareFunctionParams(req: Express.Request, res: Express.Response,
        next: Express.NextFunction, app: ProtonApplication): MiddlewareFunctionParams {
        return { req: req, res: res, next: next, app: app }
    }

    public withDBConnector(dbConnector: DBConnector<any, any>): this {
        this.dbConnector = dbConnector;
        return this;
    }

    public withDBConnectorAs(dbConnector: { new(...args: any[]) }): this {
        this.withDBConnector(new dbConnector());
        return this;
    }

    public withConfig(config: any) : this {
        this.config = config;
        return this;
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
                        middleware.middlewareFuntion.call(middleware, this.createMiddlewareFunctionParams(req, res, next, this));
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

    public addRouterAs(router: { new(...args: any[]) }): this {
        this.addRouter(new router());
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

    public addMiddlewareAs(middleware: { new(...args: any[]) }): this {
        this.addMiddleware(new middleware());
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
