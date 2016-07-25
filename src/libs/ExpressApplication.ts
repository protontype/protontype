import { SequelizeDB } from './SequelizeDB';
import * as Express from "express"
import { Middlewares } from '../libs/Middlewares';

/**
 * @author Humberto Machado
 */
export class ExpressApplication {
    private express: any;
    private middlewares: Middlewares;
    private db: SequelizeDB;

    /**
     * Create express application instance and middlewares
     */
    constructor() {
        this.express = Express();
        this.middlewares = new Middlewares(this.express);
        this.db = new SequelizeDB();
    }

    /**
     * Initialize express application and load middlewares
     * @return express instance
     */
    public bootstrap(): any {
        this.middlewares.startMiddlewares();
        let port: number = this.express.get("port");
        this.db.getSequelize().sync().done(() => {
            this.express.listen(port, () => console.log(`NTask API - porta ${port}`));
        })
        return this.express;
    }

    public getExpress(): any {
        return this.express;
    }

    public getDB(): any {
        return this.db;
    }
}