import { create } from 'domain';
import { BaseCrudRouter, Method, Route, RouterClass, UseAuth } from '../../lib';
import { RouterFunctionParams } from '../../lib/decorators/RouteConfig';
import { JsonContentMiddleware } from './../../lib/middlewares/JsonContentMiddleware';
import { GlobalRouterMiddlewareMock, RouterMiddlewareMock } from './MiddlewareMock';
import { ModelMock1, ModelMock2 } from './ModelMock';

@UseAuth({
    create: false,
    update: false,
    read: false,
    delete: false
})
@RouterClass({
    baseUrl: "/mocks",
    modelInstances: [new ModelMock1(), new ModelMock2()],
    middlewares: [new GlobalRouterMiddlewareMock(), new JsonContentMiddleware()]
})
export class RouterMock extends BaseCrudRouter {

    @Route({
        endpoint: '/test/msg',
        method: Method.GET,
        middlewares: [new RouterMiddlewareMock()]
    })
    routeTest(params: RouterFunctionParams) {
        params.res.json({
            msg: "hello!",
            routerMidMsg: params.req.params['routerMidMsg'],
            globalMidMsg: params.req.header['globalMidMsg'],
            globalRouterMidMsg: params.req.header['globalRouterMidMsg']
        });
    }

    @Route({
        endpoint: '/test/routes',
        method: Method.GET
    })
    routeList(params: RouterFunctionParams) {
        params.res.json(this.protonApplication.getRoutesList());
    }

    @Route({
        endpoint: '/test/method',
        method: Method.POST
    })
    routePost(params: RouterFunctionParams) {
        params.res.json({ method: 'post' });
    }

    @Route({
        endpoint: '/test/method',
        method: Method.DELETE
    })
    routeDelete(params: RouterFunctionParams) {
        params.res.json({ method: 'delete' });
    }

    @Route({
        endpoint: '/test/method',
        method: Method.PATCH
    })
    routePatch(params: RouterFunctionParams) {
        params.res.json({ method: 'patch' });
    }

    @Route({
        endpoint: '/test/method',
        method: Method.HEAD
    })
    routeHead(params: RouterFunctionParams) {
        params.res.json({ method: 'head' });
    }

    @Route({
        endpoint: '/test/method',
        method: Method.OPTIONS
    })
    routeOptions(params: RouterFunctionParams) {
        params.res.json({ method: 'options' });
    }

    @Route({
        endpoint: '/test/method',
        method: Method.PUT
    })
    routePut(params: RouterFunctionParams) {
        params.res.json({ method: 'put' });
    }

    @Route()
    customRouter(params: RouterFunctionParams) {
        this.router.get('/custom', (req, res) => {
            res.send('Custom Router');
        })
    }
}