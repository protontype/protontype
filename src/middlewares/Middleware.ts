import {ExpressApplication} from "../libs/ExpressApplication";
/**
 * @author Humberto Machado
 */
export abstract class Middleware {
    protected express: any;
    protected expressApplication: ExpressApplication;

    public init(expressApplication: ExpressApplication) {
        this.express = expressApplication.getExpress();
        this.expressApplication = expressApplication;
    }

    public abstract configMiddlewares(): void;
}
