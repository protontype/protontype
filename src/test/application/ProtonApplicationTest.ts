import { JsonContentMiddleware, ProtonApplication, TypeORMDB } from '../../lib';
import { GlobalConfig } from '../../lib';
import {
    GLOBAL_MIDDLEWARE_MSG,
    GLOBAL_ROUTER_MIDDLEWARE_MSG,
    GlobalMiddlewareMock,
    ROUTER_MIDDLEWARE_MSG
} from './../utils/MiddlewareMock';
import { RouterMock } from './../utils/RouterMock';
import { assert } from 'chai';
import * as express from 'express';
import { JsonLoader } from 'jsontyped';
import { suite, test } from 'mocha-typescript';
import * as request from 'supertest';
import { createConnections } from "typeorm";

@suite('ProtonApplicationTest')
class ProtonApplicationTest {
    private config: GlobalConfig;
    private app: ProtonApplication;

    before(done: Function) {
        this.config = JsonLoader.loadFile<GlobalConfig>("./src/test/utils/config.json");
        this.app = new ProtonApplication(this.config)
            .addMiddleware(new GlobalMiddlewareMock())
            .addMiddleware(new JsonContentMiddleware())
            .addRouter(new RouterMock());
        done();
    }

    after(done: Function) {
        if (this.app && TypeORMDB.getBD()) {
            TypeORMDB.getBD().dropDatabase()
                .then(() => done())
                .catch((err) => {
                    done(err);
                });
        } else {
            done();
        }
    }

    @test('basicTest')
    basicTest(done: Function) {
        this.testApplication(done);
    }

    /**/
    @test('httpsTest')
    httpsTest(done: Function) {
        this.config.https.enabled = true;
        ((this.config.database) as any).name = "httpsTestConnection";
        let app = new ProtonApplication(this.config)
            .addRouter(new RouterMock())
            .bootstrap().then(async app => {
                done();
            }).catch((err) => {
                done(err);
            })
    }

    @test('globalConfigTest')
    globalConfigTest(done: Function) {
        new ProtonApplication()
            .addRouter(new RouterMock())
            .bootstrap().then(async app => {
                done();
            }).catch((err) => {
                done(err);
            })
    }

    private async testApplication(done: Function) {
        try {
            await this.app.bootstrap()
            assert.equal(this.app.getRouters().length, 1);
            assert.equal(this.app.getRoutesList().length, 15);

            await this.assertRouteGet("/mocks/blah", this.app.getExpress())
                .then(() => assert.fail())
                .catch((err) => { assert.isNotNull(err) });

            await this.assertRouteGet("/mocks/test/msg", this.app.getExpress(), (err, res) => {
                assert.equal(res.body.msg, "hello!");
                assert.equal(res.body.routerMidMsg, ROUTER_MIDDLEWARE_MSG);
                assert.equal(res.body.globalMidMsg, GLOBAL_MIDDLEWARE_MSG);
                assert.equal(res.body.globalRouterMidMsg, GLOBAL_ROUTER_MIDDLEWARE_MSG);
            });

            await this.populateMocks();
            await this.updateMocks();
            await this.assertModelMockRoutes();
            done();
        } catch (err) {
            done(err);
        }
    }

    private async populateMocks(): Promise<any> {
        return new Promise<ProtonApplication>((resolve, reject) => {
            request(this.app.getExpress()).post('/mocks/').send(JSON.stringify({ id: 1, mockCol1: "mockCol1", mockCol2: 1 })).expect(200).end((err, res) => {
                request(this.app.getExpress()).post('/mocks/').send(JSON.stringify({ id: 2, mockCol1: "mock2Col1", mockCol2: 2 })).expect(200).end((err, res) => {
                    request(this.app.getExpress()).post('/mocks/').send(JSON.stringify({ id: 3, mockCol1: "mock2Col1", mockCol2: 2 })).expect(200).end((err, res) => {
                        resolve();
                    });
                });
            });
        });
    }

    private async updateMocks(): Promise<any> {
        return new Promise<ProtonApplication>((resolve, reject) => {
            request(this.app.getExpress()).put('/mocks/1').send(JSON.stringify({ mockCol1: "mockCol1Updated" })).expect(200).end((err, res) => {
                request(this.app.getExpress()).delete('/mocks/2').expect(200).end((err, res) => {
                    resolve();
                });
            });
        });
    }

    private async assertModelMockRoutes() {
        await this.assertRouteGet("/mocks/", this.app.getExpress(), (err, res) => { assert.isNull(err); });
        await this.assertRouteGet("/mocks/1", this.app.getExpress(), (err, res) => {
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