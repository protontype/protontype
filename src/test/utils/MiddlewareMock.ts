import { MiddlewareFunctionParams } from './../../lib/decorators/MiddlewareConfig';
import { Middleware, ProtonMiddleware } from '../../lib';
export const ROUTER_MIDDLEWARE_MSG: string = 'router middleware tested';
export const GLOBAL_MIDDLEWARE_MSG: string = 'global middleware tested';
export const GLOBAL_ROUTER_MIDDLEWARE_MSG: string = 'global router middleware tested';

export class RouterMiddlewareMock extends ProtonMiddleware {
    @Middleware(true)
    routerMiddlewareTest(params: MiddlewareFunctionParams) {
        params.req.params['routerMidMsg'] = ROUTER_MIDDLEWARE_MSG;
        //params.next();
    }
}

export class GlobalRouterMiddlewareMock extends ProtonMiddleware {
    @Middleware(true)
    globalMiddlewareTest(params: MiddlewareFunctionParams) {
        params.req.header['globalRouterMidMsg'] = GLOBAL_ROUTER_MIDDLEWARE_MSG;
        //params.next();
    }
}

export class GlobalMiddlewareMock extends ProtonMiddleware {
    @Middleware(true)
    globalMiddlewareTest(params: MiddlewareFunctionParams) {
        params.req.header['globalMidMsg'] = GLOBAL_MIDDLEWARE_MSG;
    }
}