import {ExpressApplication} from "../libs/ExpressApplication";
/**
 * @author Humberto Machado
 */
export abstract class Middleware {
    protected express: any;
    protected expressApplication: ExpressApplication;

    public init(expressApplication: ExpressApplication): Middleware {
        this.express = expressApplication.getExpress();
        this.expressApplication = expressApplication;
        return this;
    }

    public abstract configMiddlewares(): void;
}
