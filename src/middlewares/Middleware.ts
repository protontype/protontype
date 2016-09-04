import {ExpressApplication} from "../libs/ExpressApplication";
import * as Express from "express";
/**
 * @author Humberto Machado
 */
export abstract class Middleware {
    protected express: Express.Application;
    protected expressApplication: ExpressApplication;

    public init(expressApplication: ExpressApplication): Middleware {
        this.express = expressApplication.getExpress();
        this.expressApplication = expressApplication;
        return this;
    }

    public abstract configMiddlewares(): void;
}
