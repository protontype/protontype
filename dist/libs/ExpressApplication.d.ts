import { SequelizeDB } from "./SequelizeDB";
import { ExpressRouter } from "../routes/ExpressRouter";
import { Middleware } from "../middlewares/Middleware";
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
    bootstrap(): any;
    addRouter(router: ExpressRouter): this;
    addMiddleware(middleware: Middleware): this;
    private configureRoutes();
    private configMiddlewares();
    getExpress(): any;
    getSequelizeDB(): SequelizeDB;
}
