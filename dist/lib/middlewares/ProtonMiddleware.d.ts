/// <reference types="express" />
import { ProtonApplication } from '../application/ProtonApplication';
import * as Express from 'express';
/**
 * @author Humberto Machado
 */
export declare abstract class ProtonMiddleware {
    protected express: Express.Application;
    protected protonApplication: ProtonApplication;
    middlewareFuntion: Express.RequestHandler;
    modelName: string;
    init(protonApplication: ProtonApplication): ProtonMiddleware;
    configMiddlewares(): void;
}
