import { SequelizeDB } from './SequelizeDB';
import { Middlewares } from '../libs/Middlewares';
import * as Express from 'express';
import { ExpressRouter } from '../routes/ExpressRouter';

/**
 * @author Humberto Machado
 */
export class ExpressApplication {
    private express: any;
    private middlewares: Middlewares;
    private sequelizeDB: SequelizeDB;
    private routers: ExpressRouter[] = [];

    /**
     * Create express application instance and middlewares
     */
    constructor() {
        this.express = Express();
        this.middlewares = new Middlewares(this.express);
        this.sequelizeDB = new SequelizeDB();
    }

    /**
     * Initialize express application and load middlewares
     * @return express instance
     */
    public bootstrap(): any {
        this.middlewares.startMiddlewares();
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

    private startRoutes(): void {
        this.routers.forEach(router => {
            router.start();
        });
    }

    public getExpress(): any {
        return this.express;
    }

    public getSequelizeDB(): SequelizeDB {
        return this.sequelizeDB;
    }
}
