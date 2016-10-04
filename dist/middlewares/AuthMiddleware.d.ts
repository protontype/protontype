import { Middleware } from "./Middleware";
import * as express from 'express';
/**
 * @author Humberto Machado
 */
export declare abstract class AuthMiddleware extends Middleware {
    abstract authenticate(): express.Handler;
}
