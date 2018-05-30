import { assert } from 'chai';
import express from 'express';
import { JsonLoader } from 'jsontyped';
import request from 'supertest';
import 'mocha';

import { GlobalConfig, JsonContentMiddleware, ProtonApplication, Database, DefaultDBConnector } from '../../lib';
import {
    GLOBAL_MIDDLEWARE_MSG,
    GLOBAL_ROUTER_MIDDLEWARE_MSG,
    GlobalMiddlewareMock,
    ROUTER_MIDDLEWARE_MSG,
} from './../utils/MiddlewareMock';
import { RouterMock } from './../utils/RouterMock';

describe('ProtonApplicationTest', () => {
    it('globalConfigTest', globalConfigTest);
    it('noServersTest', noServersTest);
    it('basicTest', basicTest);
});

function globalConfigTest(done) {
    new ProtonApplication()
        .withDBConnectorAs(DefaultDBConnector)
        .addRouterAs(RouterMock)
        .start().then(app => {
            finalyTest(done);
        }).catch((err) => {
            done(err);
        });
}

function noServersTest(done: Function) {
    let config: GlobalConfig = JsonLoader.loadFile<GlobalConfig>("./src/test/utils/config.json");
    config.database.name = 'noServersTestDb';
    config.servers = [];
    new ProtonApplication(config)
        .withConfig(config)
        .start().then(app => {
            assert.fail();
            done();
        }).catch((err) => {
            finalyTest(done);
        });
}

function basicTest(done: Function) {
    let config: GlobalConfig = JsonLoader.loadFile<GlobalConfig>("./src/test/utils/config.json");
    config.database.name = 'basicTestDb';
    let app: ProtonApplication = new ProtonApplication(config)
        .addMiddlewareAs(GlobalMiddlewareMock)
        .addMiddlewareAs(JsonContentMiddleware)
        .addRouterAs(RouterMock);
    basicTestAsyncExecution(done, app);
}

async function basicTestAsyncExecution(done: Function, app: ProtonApplication) {
    try {
        await app.start()
        assert.equal(app.getRouters().length, 1);
        assert.equal(app.getRoutesList().length, 15);

        await assertRouteGet("/mocks/blah", app.getExpress())
            .then(() => assert.fail())
            .catch((err) => { assert.isNotNull(err) });

        await assertRouteGet("/mocks/test/msg", app.getExpress(), (err, res) => {
            assert.equal(res.body.msg, "hello!");
            assert.equal(res.body.routerMidMsg, ROUTER_MIDDLEWARE_MSG);
            assert.equal(res.body.globalMidMsg, GLOBAL_MIDDLEWARE_MSG);
            assert.equal(res.body.globalRouterMidMsg, GLOBAL_ROUTER_MIDDLEWARE_MSG);
        });

        await assertRouteGet("/proton/routes", app.getExpress())
            .catch((err) => { assert.fail() });

        await populateMocks(app);
        await updateMocks(app);
        await assertModelMockRoutes(app);
        await testHTTPMethods(app);
        await finalyTest(done);
    } catch (err) {
        done(err);
    }
}

async function finalyTest(done: Function) {
    try {
        await Database.getBD().dropDatabase();
        await Database.getBD().close();
        done();
    } catch (err) {
        done(err);
    }
}

async function populateMocks(app: ProtonApplication): Promise<any> {
    return new Promise<ProtonApplication>((resolve, reject) => {
        request(app.getExpress()).post('/mocks/').send(JSON.stringify({ id: 1, mockCol1: "mockCol1", mockCol2: 1 })).expect(200).end((err, res) => {
            request(app.getExpress()).post('/mocks/').send(JSON.stringify({ id: 2, mockCol1: "mock2Col1", mockCol2: 2 })).expect(200).end((err, res) => {
                request(app.getExpress()).post('/mocks/').send(JSON.stringify({ id: 3, mockCol1: "mock2Col1", mockCol2: 2 })).expect(200).end((err, res) => {
                    resolve();
                });
            });
        });
    });
}

async function updateMocks(app: ProtonApplication): Promise<any> {
    return new Promise<ProtonApplication>((resolve, reject) => {
        request(app.getExpress()).put('/mocks/1').send(JSON.stringify({ mockCol1: "mockCol1Updated" })).expect(200).end((err, res) => {
            request(app.getExpress()).delete('/mocks/2').expect(200).end((err, res) => {
                resolve();
            });
        });
    });
}

async function testHTTPMethods(app: ProtonApplication): Promise<any> {
    return new Promise<ProtonApplication>((resolve, reject) => {
        request(app.getExpress()).head('/mocks/test/method').expect(200).end((err, res) => {
            if (err) reject(err);
            request(app.getExpress()).patch('/mocks/test/method').expect(200).end((err, res) => {
                if (err) reject(err);
                assert.equal(res.body.method, 'patch');
                request(app.getExpress()).options('/mocks/test/method').expect(204).end((err, res) => {
                    if (err) reject(err);
                    resolve();
                });
            });
        });
    });
}

async function assertModelMockRoutes(app: ProtonApplication) {
    await assertRouteGet("/mocks/", app.getExpress(), (err, res) => { assert.isNull(err); });
    await assertRouteGet("/mocks/1", app.getExpress(), (err, res) => {
        assert.isNull(err);
        assert.equal(res.body.mockCol1, 'mockCol1Updated');
    });
}

function assertRouteGet(route: string, expressApp: express.Application, assertFunction?: Function): Promise<any> {
    return new Promise<ProtonApplication>((resolve, reject) => {
        request(expressApp).get(route)
            .expect(200)
            .end((err, res) => {
                if (assertFunction) {
                    assertFunction.call(this, err, res);
                }
                if (err) {
                    reject(err);
                }
                resolve();
            });
    });
}