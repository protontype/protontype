import { SequelizeDB } from '../../lib';
import { GlobalConfig } from '../../lib';
import { SequelizeModelConfig } from '../../lib';
import { Mock, ModelMock1, ModelMock2 } from '../utils/ModelMock';
import { ModelInstance } from './../../lib/models/BaseModel';
import { assert } from 'chai';
import { JsonLoader } from 'jsontyped';
import { suite, test, timeout } from 'mocha-typescript';

@suite('Testes para SequelizeDB')
class SequelizeDBtest {
    private config: GlobalConfig;
    private db: SequelizeDB;

    before(done: Function) {
        this.setup(done);
    }

    after(done: Function) {
        this.db.getInstance().drop().then(() => done());
    }

    private async setup(done: Function) {
        try {
            this.config = JsonLoader.loadFile<GlobalConfig>("./src/test/utils/config.json");
            assert.notEqual(this.config, null);
            assert.notEqual(this.config.database, null);
            new ModelMock1();
            new ModelMock2();
            this.db = new SequelizeDB(this.config.database)
                .loadModels(SequelizeModelConfig.modelsList);
            await this.db.getInstance().sync();
            assert.equal(this.db.getModels().size(), 2);
            done();
        } catch (err) {
            done(err);
        }

    }

    @timeout(30000)
    @test('createAndFindTest')
    createAndFindTest(done: Function) {
        this.createAndAssertModels(done);
    }

    private async createAndAssertModels(done: Function) {
        try {
            let modelMock1: ModelMock1 = this.db.getModel("ModelMock1");
            let modelMock1Instance = modelMock1.getInstance();
            await modelMock1Instance.build({ mockCol1: "record1", mockCol2: 1 }).save();
            await modelMock1Instance.build({ mockCol1: "record2", mockCol2: 2 }).save();
            await modelMock1Instance.build({ mockCol1: "record3", mockCol2: 3 }).save();
            let records: ModelInstance<Mock>[] = await modelMock1Instance.findAll({ order: 'mockCol2 asc' });
            assert.equal(records.length, 3);
            assert.equal(records[0].toJSON().mockCol2, 1);
            assert.equal(records[1].toJSON().mockCol2, 2);
            assert.equal(records[2].toJSON().mockCol2, 3);
            done();
        } catch (err) {
            done(err);
        }


    }

    @test('Create DB without model')
    noModelTest() {
        let db: SequelizeDB = new SequelizeDB(this.config.database);
        assert.equal(db.getModels().size(), 0);
    }
}
