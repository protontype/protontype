/// <reference types="express" />
import { ExpressApplication } from '../application/ExpressApplication';
import * as Express from 'express';
/**
 * @author Humberto Machado
 */
export declare abstract class Middleware {
    protected express: Express.Application;
    protected expressApplication: ExpressApplication;
    init(expressApplication: ExpressApplication): Middleware;
    abstract configMiddlewares(): void;
}
