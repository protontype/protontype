import { ProtonMiddleware } from './ProtonMiddleware';
import * as express from 'express';
/**
 * @author Humberto Machado
 */
export abstract class AuthMiddleware extends ProtonMiddleware {
    public abstract authenticate(): express.Handler;
}
