import {Middleware} from "./Middleware";
import * as express from 'express';
/**
 * @author Humberto Machado
 */
export abstract class AuthMiddleware extends Middleware {
    public abstract authenticate(): express.Handler;
}
