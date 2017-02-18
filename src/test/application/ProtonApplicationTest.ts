import { ProtonApplication } from '../../lib';
import { GlobalConfig } from '../../lib';
import { RouterMock } from './../utils/RouterMock';
import { assert } from 'chai';
import * as express from 'express';
import { JsonLoader } from 'jsontyped';
import { suite, test } from 'mocha-typescript';
import * as request from 'supertest';

@suite('ProtonApplicationTest')
class ProtonApplicationTest {
    private config: GlobalConfig;
    private app: ProtonApplication;

    before(done: Function) {
        this.config = JsonLoader.loadFile<GlobalConfig>("./src/test/utils/config.json");
        this.app = new ProtonApplication(this.config).addRouter(new RouterMock());
        done();
    }

    after(done: Function) {
        this.app.getProtonDB().getInstance().drop().then(() => done()).catch((err) => {
            done();
        });
    }

    @test('basicTest')
    basicTest(done: Function) {
        this.testApplication(done);
    }

    private async testApplication(done: Function) {
        try {
            await this.app.bootstrap()
            assert.equal(this.app.getRouters().length, 1);
            assert.equal(this.app.getModel("ModelMock1").getModelName(), "ModelMock1");
            assert.equal(this.app.getModel("ModelMock2").getModelName(), "ModelMock2");
            assert.equal(this.app.getRoutesList().length, 13);

            await this.assertRouteGet("/mocks/blah", this.app.getExpress())
                .then(() => assert.fail())
                .catch((err) => { assert.isNotNull(err) });

            await this.assertRouteGet("/mocks/test/msg", this.app.getExpress(), (err, res) => {
                assert.equal(res.body.msg, "hello!");
            });
            await this.assertModelMock1Routes();
            await this.assertModelMock2Routes();
            done();
        } catch (err) {
            done(err);
        }
    }

    private async assertModelMock1Routes() {
        await this.assertRouteGet("/mocks/modelmock1/", this.app.getExpress(), (err, res) => { assert.isNull(err); });
    }

    private async assertModelMock2Routes() {
        await this.assertRouteGet("/mocks/modelmock2/", this.app.getExpress(), (err, res) => { assert.isNull(err); });
    }

    private assertRouteGet(route: string, app: express.Application, assertFunction?: Function): Promise<any> {
        return new Promise<ProtonApplication>((resolve, reject) => {
            request(app).get(route)
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