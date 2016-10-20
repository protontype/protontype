import { RouterMock } from './../utils/RouterMock';
import { ModelMock } from './../utils/ModelMock';
import * as assert from 'assert';
import { JsonLoader } from 'jsontyped';
import { GlobalConfig } from './../../src/application/ProtonConfigLoader';
import { ExpressApplication } from '../../src';
import { suite, test } from 'mocha-typescript';

@suite('ExpressApplicationTest')
class ExpressApplicationTest {
    private config: GlobalConfig;

    before() {
        this.config = JsonLoader.loadFile<GlobalConfig>("./test/utils/config.json");
    }

    @test('basicTest')
    basicTest() {
        let app: ExpressApplication = new ExpressApplication(this.config).addRouter(new RouterMock());
        app.bootstrap();

        assert.equal(app.getRouters().length, 1);
        assert.equal(app.getModel("ModelMock").getModelName(), "ModelMock");
    }

    @test('failTest')
    failTest() {
        assert.throws(() => {
            let app: ExpressApplication = new ExpressApplication();
            app.bootstrap();
        })
    }
}