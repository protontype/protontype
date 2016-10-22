import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { DefaultMiddleware } from '../middlewares/DefaultMiddleware';
import { Middleware } from '../middlewares/Middleware';
import { BaseModel } from '../models/BaseModel';
import { ExpressRouter } from '../router/ExpressRouter';
import { Method } from '../router/Method';
import { RouteConfig } from '../router/RouteConfig';
import { GlobalConfig, ProtonConfigLoader } from './ProtonConfigLoader';
import { SequelizeDB } from './SequelizeDB';
import { SequelizeModelConfig } from './SequelizeModelConfig';
import * as Express from 'express';

/**
 * @author Humberto Machado
 */
export class ExpressApplication {
    private express: Express.Application;
    private middlewares: Middleware[] = [];
    private sequelizeDB: SequelizeDB;
    private routers: ExpressRouter[] = [];
    private authMiddleware: AuthMiddleware;
    private config: GlobalConfig;

    /**
     * Create express application instance and middlewares
     */
    constructor(config?: GlobalConfig) {
        this.config = this.loadConfig(config);
        this.express = Express();
        this.sequelizeDB = new SequelizeDB(this.config.database).loadModels(SequelizeModelConfig.modelsList);
    }

    /**
     * Initialize express application and load middlewares
     * @return express instance
     */
    public bootstrap(): Promise<ExpressApplication> {
        return new Promise<ExpressApplication>((resolve, reject) => {
            this.configMiddlewares();
            let port: number = this.express.get("port");
            this.sequelizeDB.getInstance().sync().then(() => {
                this.configureRoutes();
                this.express.listen(port, () => console.log(`Application listen on port ${port}`));
                resolve(this);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    private loadConfig(config?: GlobalConfig): GlobalConfig {
        if (config) {
            return config;
        } else {
            return this.config = ProtonConfigLoader.loadConfig();
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
                this.express.post(router.getBaseUrl() + config.endpoint, this.authenticate(config.useAuth), (req, res) => {
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

    public addRouter(router: ExpressRouter): this {
        this.routers.push(router);
        return this;
    }

    public addMiddleware(middleware: Middleware): this {
        this.middlewares.push(middleware);
        return this;
    }

    public getExpress(): Express.Application {
        return this.express;
    }

    public getSequelizeDB(): SequelizeDB {
        return this.sequelizeDB;
    }

    public getModel<T extends BaseModel<any>>(modelName: string): T {
        return <T>this.sequelizeDB.getModel(modelName);
    }

    public getRouters(): ExpressRouter[] {
        return this.routers;
    }

    public getConfig(): GlobalConfig {
        return this.config;
    }

    /**
     * @return list of all configured routes in ExpressApplication
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
