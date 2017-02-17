/// <reference types="express" />
import { ProtonApplication } from '../application/ProtonApplication';
import * as Express from 'express';
/**
 * @author Humberto Machado
 */
export declare abstract class Middleware {
    protected express: Express.Application;
    protected protonApplication: ProtonApplication;
    init(protonApplication: ProtonApplication): Middleware;
    abstract configMiddlewares(): void;
}
