import { Method, Route, RouterClass, TypeORMCrudRouter, UseAuth } from '../../lib';
import { RouterFunctionParams } from '../../lib/decorators/RouteConfig';
import { BodyParserMiddleware } from './../../lib/middlewares/BodyParserMiddleware';
import { GlobalRouterMiddlewareMock, RouterMiddlewareMock } from './MiddlewareMock';
import { ModelMock } from './ModelMock';

@UseAuth({
    create: false,
    update: false,
    read: false,
    delete: false
})
@RouterClass({
    baseUrl: "/mocks",
    middlewares: [new GlobalRouterMiddlewareMock()],
    model: ModelMock
})
export class RouterMock extends TypeORMCrudRouter {

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