import { ExpressApplication } from './../libs/ExpressApplication';
/**
 * Express routes configurations
 */
export abstract class ExpressRouter {
    protected express: any;

    public abstract start(): void;

    constructor(expressApplication: ExpressApplication) {
        this.express = expressApplication.getExpress();
    }
}