import {SequelizeModel} from "./SequelizeModel";
import {SequelizeDB} from "../libs/SequelizeDB";
import * as Sequelize from "sequelize"

/**
 * @author Humberto Machado
 */
export abstract class BaseModel implements SequelizeModel {
    //Sequelize Model native instance. @see http://docs.sequelizejs.com/en/latest/docs/models-usage/
    protected nativeInstance: Sequelize.Model<any, any>;
    protected name: string;
    protected definition: Sequelize.DefineAttributes;

    public getModelName(): string {
        return this.name;
    }

    public defineModel(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): any {
        this.nativeInstance = sequelize.define(this.getModelName(), this.definition, {});
        return this;
    }

    public associate(sequelizeDB: SequelizeDB): void {
        //Hook Method
    }

    public getNativeInstance(): Sequelize.Model<any, any> {
        return this.nativeInstance;
    }

    public find(params: Sequelize.FindOptions): Promise<any> {
        return this.nativeInstance.findAll(params);
    }

    public create(object: Sequelize.CreateOptions): Promise<any> {
        return this.nativeInstance.create(object);
    }

    public findOne(params: Sequelize.FindOptions): Promise<any> {
        return this.nativeInstance.findOne(params);
    }

    public update(object: Object, params: Sequelize.UpdateOptions): Promise<any> {
        return this.nativeInstance.update(object, params);
    }

    public destroy(params: Sequelize.DestroyOptions): Promise<any> {
        return this.nativeInstance.destroy(params);
    }
}

export var DataTypes: Sequelize.DataTypes;