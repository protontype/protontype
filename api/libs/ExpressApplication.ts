import {SequelizeDB} from "./SequelizeDB";
import * as Express from "express";
import {ExpressRouter} from "../routes/ExpressRouter";
import {Middleware} from "../middlewares/Middleware";

/**
 * @author Humberto Machado
 */
export class ExpressApplication {
    private express: any;
    private middlewares: Middleware[] = [];
    private sequelizeDB: SequelizeDB;
    private routers: ExpressRouter[] = [];

    /**
     * Create express application instance and middlewares
     */
    constructor() {
        this.express = Express();
        // this.middlewares = new Middlewares(this.express);
        this.sequelizeDB = new SequelizeDB();
    }

    /**
     * Initialize express application and load middlewares
     * @return express instance
     */
    public bootstrap(): any {
        this.configMiddlewares();
        let port: number = this.express.get("port");
        this.sequelizeDB.getDB().sequelize.sync().done(() => {
            this.startRoutes();
            this.express.listen(port, () => console.log(`NTask API - porta ${port}`));
        });
        return this.express;
    }

    public addRouter(router: ExpressRouter) {
        this.routers.push(router);
        return this;
    }

    public addMiddleware(middleware: Middleware) {
        this.middlewares.push(middleware);
        return this;
    }

    private startRoutes(): void {
        this.routers.forEach(router => {
            router.start();
        });
    }

    private configMiddlewares(): void {
        this.middlewares.forEach(middleware => {
            middleware.configMiddlewares();
        })
    }

    public getExpress(): any {
        return this.express;
    }

    public getSequelizeDB(): SequelizeDB {
        return this.sequelizeDB;
    }
}
