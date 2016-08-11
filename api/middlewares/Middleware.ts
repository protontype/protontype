import {ExpressApplication} from "../libs/ExpressApplication";
/**
 * @author Humberto Machado
 */
export abstract class Middleware {
    protected express: any;

    public init(expressApplication: ExpressApplication) {
        this.express = expressApplication.getExpress();
    }

    public abstract configMiddlewares(): void;
}
