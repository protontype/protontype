/**
 * Created by beto_ on 05/08/2016.
 */
export abstract class Middleware {
    protected express: any;

    constructor(expressApplication: ExpressApplication) {
        this.express = expressApplication.getExpress();
    }

    public abstract configMiddlewares(): void;
}
