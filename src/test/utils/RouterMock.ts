import { BaseCrudRouter, Method, Route, RouterClass, UseAuth } from '../../lib';
import { ModelMock1, ModelMock2 } from './ModelMock';
import * as express from 'express';

@UseAuth()
@RouterClass({
    baseUrl: "/mocks",
    modelInstances: [new ModelMock1(), new ModelMock2()]
})
export class RouterMock extends BaseCrudRouter {

    @Route({
        endpoint: '/test/msg',
        method: Method.GET
    })
    routeTest(req: express.Request, res: express.Response) {
        res.json({ msg: "hello!" });
    }

        @Route({
        endpoint: '/test/routes',
        method: Method.GET
    })
    routeList(req: express.Request, res: express.Response) {
        res.json(this.expressApplication.getRoutesList());
    }

}