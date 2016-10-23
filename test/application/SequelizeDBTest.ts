import { SequelizeDB } from '../../src/application/SequelizeDB';
import { ModelMock1, ModelMock2 } from '../utils/ModelMock';
import { GlobalConfig } from './../../src/application/ProtonConfigLoader';
import { SequelizeModelConfig } from './../../src/application/SequelizeModelConfig';
import { assert } from 'chai';
import { JsonLoader } from 'jsontyped';
import { suite, test } from 'mocha-typescript';

@suite('Testes para SequelizeDB')
class SequelizeDBtest {
    private config: GlobalConfig;

    before() {
        this.config = JsonLoader.loadFile<GlobalConfig>("./test/utils/config.json");
    }

    @test('basicTest')
    basicTest() {
        assert.notEqual(this.config, null);
        assert.notEqual(this.config.database, null);
        new ModelMock1(); 
        new ModelMock2();
        let db: SequelizeDB = new SequelizeDB(this.config.database)
            .loadModels(SequelizeModelConfig.modelsList);
        assert.equal(db.getModels().size(), 2);
    }

    @test('Create DB without model')
    noModelTest() {
        let db: SequelizeDB = new SequelizeDB(this.config.database);
        assert.equal(db.getModels().size(), 0);
    }
}
