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
     * Create express application instance and middlewares
     */
    constructor(config?: GlobalConfig) {
        this.config = this.loadConfig(config);
        this.logger = Logger.createLogger(this.config.logger);
        this.express = Express();
        this.protonDB = new ProtonDB(this.config.database).loadModels(ProtonModelConfig.modelsList);
    }

    /**
     * Initialize express application and load middlewares
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
        let port: number = this.express.get("port");
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
     * Initilize all configured middlewares
     */
    private configMiddlewares(): void {
        new DefaultMiddleware().init(this).configMiddlewares();
        this.middlewares.forEach(middleware => {
            middleware.init(this);
            middleware.configMiddlewares();
            this.express.use((req, res, next) => middleware.middlewareFuntion.call(middleware, req, res, next));
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
                this.express.get(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), (req, res) => {
                    config.routeFunction.call(router, req, res, this.getModel(config.modelName));
                });
                break;
            case Method.POST:
                this.express.post(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), this.routerConfigMiddlewares(config), (req, res) => {
                        config.routeFunction.call(router, req, res, this.getModel(config.modelName));
                    });
                break;
            case Method.PUT:
                this.express.put(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), (req, res) => {
                    config.routeFunction.call(router, req, res, this.getModel(config.modelName));
                });
                break;
            case Method.DELETE:
                this.express.delete(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), (req, res) => {
                    config.routeFunction.call(router, req, res, this.getModel(config.modelName));
                });
                break;
            case Method.PATCH:
                this.express.patch(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), (req, res) => {
                    config.routeFunction.call(router, req, res, this.getModel(config.modelName));
                });
                break;
            case Method.OPTIONS:
                this.express.options(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), (req, res) => {
                    config.routeFunction.call(router, req, res, this.getModel(config.modelName));
                });
                break;
            case Method.HEAD:
                this.express.head(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), (req, res) => {
                    config.routeFunction.call(router, req, res, this.getModel(config.modelName));
                });
                break;
        }
    }

    /**
     * Add authentication middleware implementations
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

    private routerConfigMiddlewares(config: RouteConfig): Express.Handler[] {
        let middlewares: Express.Handler[] = [];
        if (config.middlewares) {
            config.middlewares.forEach(middleware => {
                if (middleware.middlewareFuntion) {
                    middlewares.push((req, res, next) => {
                        middleware.middlewareFuntion.call(middleware, req, res, next);
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

    public addRouter(router: ExpressRouter): this {
        this.routers.push(router);
        return this;
    }

    public addMiddleware(middleware: ProtonMiddleware): this {
        this.middlewares.push(middleware);
        return this;
    }

    public getExpress(): Express.Application {
        return this.express;
    }

    public getProtonDB(): ProtonDB {
        return this.protonDB;
    }

    public getModel<T extends BaseModel<any>>(modelName: string): T {
        return <T>this.protonDB.getModel(modelName);
    }

    public getRouters(): ExpressRouter[] {
        return this.routers;
    }

    public getConfig(): GlobalConfig {
        return this.config;
    }

    /**
     * @return list of all configured routes in ProtonApplication
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
