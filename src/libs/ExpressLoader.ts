import * as Express from "express"
import { Middlewares } from '../libs/Middlewares';

/**
 * @author Humberto Machado
 */
export class ExpressLoader {
    private expressApp: any;
    private middlewares: Middlewares;

    /**
     * Create express application instance and middlewares
     */
    constructor() {
        this.expressApp = Express();
        this.middlewares = new Middlewares(this.expressApp);
    }

    /**
     * Initialize express application and load middlewares
     * @return express instance
     */
    public bootstrap(): any {
        this.middlewares.startMiddlewares();
        let port: number = this.expressApp.get("port");
        this.expressApp.listen(port, () => console.log(`NTask API - porta ${port}`));

        return this.expressApp;
    }
}