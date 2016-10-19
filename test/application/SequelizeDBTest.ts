import { SequelizeDB } from '../../src/application/SequelizeDB';
import { ModelMock } from '../utils/ModelMock';
import { GlobalConfig } from './../../src/application/Config';
import { SequelizeModelConfig } from './../../src/application/SequelizeModelConfig';
import * as assert from 'assert';
import { JsonLoader } from 'jsontyped';
import { suite, test } from 'mocha-typescript';

@suite('Testes para SequelizeDB')
class SequelizeDBtest {
    private readonly CONFIG: GlobalConfig = JsonLoader.loadFile<GlobalConfig>("./test/utils/", "config.json");

    @test('basicTest')
    basicTest() {
        let model: ModelMock = new ModelMock();
        SequelizeModelConfig.add(model);
        let db: SequelizeDB = new SequelizeDB(this.CONFIG.database);
        db.loadModels(SequelizeModelConfig.modelsList);
        assert.equal(db.getModels().size(), 1);
    }

    @test('Create DB without model')
    noModelTest() {
        let db: SequelizeDB = new SequelizeDB(this.CONFIG.database);
        assert.equal(db.getModels().size(), 0);
    }
}