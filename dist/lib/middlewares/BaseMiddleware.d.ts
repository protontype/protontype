import { ProtonApplication } from '../application/ProtonApplication';
import Express from 'express';
/**
 * @author Humberto Machado
 */
export declare abstract class BaseMiddleware {
    protected express: Express.Application;
    protected protonApplication: ProtonApplication;
    middlewareFuntion: Express.RequestHandler;
    autoNext: boolean;
    init(protonApplication: ProtonApplication): BaseMiddleware;
    configMiddlewares(): void;
}
