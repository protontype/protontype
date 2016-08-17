import { ExpressApplication } from "../libs/ExpressApplication";
/**
 * @author Humberto Machado
 */
export declare abstract class Middleware {
    protected express: any;
    protected expressApplication: ExpressApplication;
    init(expressApplication: ExpressApplication): Middleware;
    abstract configMiddlewares(): void;
}
