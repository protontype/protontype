import { ProtonMiddleware } from './ProtonMiddleware';
import * as express from 'express';
/**
 * @author Humberto Machado
 */
export declare abstract class AuthMiddleware extends ProtonMiddleware {
    abstract authenticate(): express.Handler;
}
