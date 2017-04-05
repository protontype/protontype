import { BaseCrudRouter, Method, Route, RouterClass, UseAuth } from '../../lib';
import { GlobalRouterMiddlewareMock, RouterMiddlewareMock } from './MiddlewareMock';
import { ModelMock1, ModelMock2 } from './ModelMock';
import * as express from 'express';

@UseAuth()
@RouterClass({
    baseUrl: "/mocks",
    modelInstances: [new ModelMock1(), new ModelMock2()],
    middlewares: [new GlobalRouterMiddlewareMock()]
})
export class RouterMock extends BaseCrudRouter {

    @Route({
        endpoint: '/test/msg',
        method: Method.GET,
        middlewares: [new RouterMiddlewareMock()]
    })
    routeTest(req: express.Request, res: express.Response) {
        res.json({
            msg: "hello!",
            routerMidMsg: req.params['routerMidMsg'],
            globalMidMsg: req.header['globalMidMsg'],
            globalRouterMidMsg: req.header['globalRouterMidMsg']
        });
    }

    @Route({
        endpoint: '/test/routes',
        method: Method.GET
    })
    routeList(req: express.Request, res: express.Response) {
        res.json(this.protonApplication.getRoutesList());
    }

    @Route({
        endpoint: '/test/method',
        method: Method.POST
    })
    routePost(req: express.Request, res: express.Response) {
        res.json({ method: 'post' });
    }

    @Route({
        endpoint: '/test/method',
        method: Method.DELETE
    })
    routeDelete(req: express.Request, res: express.Response) {
        res.json({ method: 'delete' });
    }

    @Route({
        endpoint: '/test/method',
        method: Method.PATCH
    })
    routePatch(req: express.Request, res: express.Response) {
        res.json({ method: 'patch' });
    }

    @Route({
        endpoint: '/test/method',
        method: Method.HEAD
    })
    routeHead(req: express.Request, res: express.Response) {
        res.json({ method: 'head' });
    }

    @Route({
        endpoint: '/test/method',
        method: Method.OPTIONS
    })
    routeOptions(req: express.Request, res: express.Response) {
        res.json({ method: 'options' });
    }

    @Route({
        endpoint: '/test/method',
        method: Method.PUT
    })
    routePut(req: express.Request, res: express.Response) {
        res.json({ method: 'put' });
    }
}