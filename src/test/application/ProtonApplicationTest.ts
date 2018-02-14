import { assert } from 'chai';
import express from 'express';
import { JsonLoader } from 'jsontyped';
import { suite, test } from 'mocha-typescript';
import request from 'supertest';

import { GlobalConfig, JsonContentMiddleware, ProtonApplication, TypeORMDB, TypeORMDBConnector } from '../../lib';
import {
    GLOBAL_MIDDLEWARE_MSG,
    GLOBAL_ROUTER_MIDDLEWARE_MSG,
    GlobalMiddlewareMock,
    ROUTER_MIDDLEWARE_MSG,
} from './../utils/MiddlewareMock';
import { RouterMock } from './../utils/RouterMock';

@suite('ProtonApplicationTest')
class ProtonApplicationTest {

    @test('globalConfigTest')
    globalConfigTest(done: Function) {
        new ProtonApplication()
            .withDBConnectorAs(TypeORMDBConnector)
            .addRouterAs(RouterMock)
            .start().then(app => {
                this.finalyTest(done);
            }).catch((err) => {
                done(err);
            });
    }

    @test('noServersTest')
    noServersTest(done: Function) {
        let config: GlobalConfig = JsonLoader.loadFile<GlobalConfig>("./src/test/utils/config.json");
        config.servers = [];
        new ProtonApplication(config)
            .withConfig(config)
            .start().then(app => {
                assert.fail();
                done();
            }).catch((err) => {
                this.finalyTest(done);
            });
    }

    @test('basicTest')
    basicTest(done: Function) {
        let config: GlobalConfig = JsonLoader.loadFile<GlobalConfig>("./src/test/utils/config.json");
        let app: ProtonApplication = new ProtonApplication(config)
            .addMiddlewareAs(GlobalMiddlewareMock)
            .addMiddlewareAs(JsonContentMiddleware)
            .addRouterAs(RouterMock);
        this.basicTestAsyncExecution(done, app);
    }

    private async basicTestAsyncExecution(done: Function, app: ProtonApplication) {
        try {
            await app.start()
            assert.equal(app.getRouters().length, 1);
            assert.equal(app.getRoutesList().length, 15);

            await this.assertRouteGet("/mocks/blah", app.getExpress())
                .then(() => assert.fail())
                .catch((err) => { assert.isNotNull(err) });

            await this.assertRouteGet("/mocks/test/msg", app.getExpress(), (err, res) => {
                assert.equal(res.body.msg, "hello!");
                assert.equal(res.body.routerMidMsg, ROUTER_MIDDLEWARE_MSG);
                assert.equal(res.body.globalMidMsg, GLOBAL_MIDDLEWARE_MSG);
                assert.equal(res.body.globalRouterMidMsg, GLOBAL_ROUTER_MIDDLEWARE_MSG);
            });

            await this.populateMocks(app);
            await this.updateMocks(app);
            await this.assertModelMockRoutes(app);
            await this.testHTTPMethods(app);
            await this.finalyTest(done);
        } catch (err) {
            done(err);
        }
    }

    private async finalyTest(done: Function) {
        try {
            await TypeORMDB.getBD().dropDatabase();
            await TypeORMDB.getBD().close();
            done();
        } catch (err) {
            done(err);
        }
    }

    private async populateMocks(app: ProtonApplication): Promise<any> {
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

    private async updateMocks(app: ProtonApplication): Promise<any> {
        return new Promise<ProtonApplication>((resolve, reject) => {
            request(app.getExpress()).put('/mocks/1').send(JSON.stringify({ mockCol1: "mockCol1Updated" })).expect(200).end((err, res) => {
                request(app.getExpress()).delete('/mocks/2').expect(200).end((err, res) => {
                    resolve();
                });
            });
        });
    }

    private async testHTTPMethods(app: ProtonApplication): Promise<any> {
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

    private async assertModelMockRoutes(app: ProtonApplication) {
        await this.assertRouteGet("/mocks/", app.getExpress(), (err, res) => { assert.isNull(err); });
        await this.assertRouteGet("/mocks/1", app.getExpress(), (err, res) => {
            assert.isNull(err);
            assert.equal(res.body.mockCol1, 'mockCol1Updated');
        });
    }

    private assertRouteGet(route: string, expressApp: express.Application, assertFunction?: Function): Promise<any> {
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
}