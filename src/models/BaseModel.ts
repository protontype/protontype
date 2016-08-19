import {SequelizeModel} from "./SequelizeModel";
import {SequelizeDB} from "../libs/SequelizeDB";
import {FindOptions} from "sequelize";
import {CreateOptions} from "sequelize";
import {UpdateOptions} from "sequelize";
import {DestroyOptions} from "sequelize";

/**
 * @author Humberto Machado
 */
export abstract class BaseModel implements SequelizeModel {
    //Sequelize Model native instance. @see http://docs.sequelizejs.com/en/latest/docs/models-usage/
    protected nativeInstance: any;
    protected name: string;
    protected definition: {};

    public getModelName(): string {
        return this.name;
    }

    public defineModel(sequelize: any, DataTypes: any): any {
        this.nativeInstance = sequelize.define(this.getModelName(), this.definition, {});
        return this;
    }

    public associate(sequelizeDB: SequelizeDB): void {
        //Hook Method
    }

    public getNativeInstance(): any {
        return this.nativeInstance;
    }

    public find(params: FindOptions): any {
        return this.nativeInstance.findAll(params);
    }

    public create(object: CreateOptions): any {
        return this.nativeInstance.create(object);
    }

    public findOne(params: FindOptions): any {
        return this.nativeInstance.findOne(params);
    }

    public update(object: Object, params: UpdateOptions): any {
        return this.nativeInstance.update(object, params);
    }

    public destroy(params: DestroyOptions): any {
        return this.nativeInstance.destroy(params);
    }
}
