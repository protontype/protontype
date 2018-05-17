import { MiddlewareFunctionParams } from './../../lib/decorators/MiddlewareConfig';
import { Middleware, BaseMiddleware } from '../../lib';
export const ROUTER_MIDDLEWARE_MSG: string = 'router middleware tested';
export const GLOBAL_MIDDLEWARE_MSG: string = 'global middleware tested';
export const GLOBAL_ROUTER_MIDDLEWARE_MSG: string = 'global router middleware tested';

export class RouterMiddlewareMock extends BaseMiddleware {
    @Middleware(true)
    routerMiddlewareTest(params: MiddlewareFunctionParams) {
        params.req.params['routerMidMsg'] = ROUTER_MIDDLEWARE_MSG;
    }
}

export class GlobalRouterMiddlewareMock extends BaseMiddleware {
    @Middleware(true)
    globalMiddlewareTest(params: MiddlewareFunctionParams) {
        params.req.header['globalRouterMidMsg'] = GLOBAL_ROUTER_MIDDLEWARE_MSG;
    }
}

export class GlobalMiddlewareMock extends BaseMiddleware {
    @Middleware(true)
    globalMiddlewareTest(params: MiddlewareFunctionParams) {
        params.req.header['globalMidMsg'] = GLOBAL_MIDDLEWARE_MSG;
    }
}