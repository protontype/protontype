import { Middleware, ProtonMiddleware } from '../../lib';
export const ROUTER_MIDDLEWARE_MSG: string = 'router middleware tested';
export const GLOBAL_MIDDLEWARE_MSG: string = 'global middleware tested';
export const GLOBAL_ROUTER_MIDDLEWARE_MSG: string = 'global router middleware tested';

export class RouterMiddlewareMock extends ProtonMiddleware {
    @Middleware()
    routerMiddlewareTest(req, res, next) {
        req.params['routerMidMsg'] = ROUTER_MIDDLEWARE_MSG;
        next();
    }
}

export class GlobalRouterMiddlewareMock extends ProtonMiddleware {
    @Middleware()
    globalMiddlewareTest(req, res, next) {
        req.header['globalRouterMidMsg'] = GLOBAL_ROUTER_MIDDLEWARE_MSG;
        next();
    }
}

export class GlobalMiddlewareMock extends ProtonMiddleware {
    @Middleware()
    globalMiddlewareTest(req, res, next) {
        req.header['globalMidMsg'] = GLOBAL_MIDDLEWARE_MSG;
        next();
    }
}