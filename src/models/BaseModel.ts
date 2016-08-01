import {SequelizeModel} from "./SequelizeModel";
import {SequelizeDB} from "../libs/SequelizeDB";

/**
 * Created by humberto.machado on 01/08/2016.
 */
export abstract class BaseModel implements SequelizeModel {
    protected model: any;
    protected name: string;
    protected definition: {};

    protected getModelName(): string {
        return this.name;
    }

    protected defineModel(sequelize: any, DataType: any): any {
        this.model = sequelize.define(this.getModelName(), this.definition, {});
        return this.model;
    }

    public associate(sequelizeDB: SequelizeDB): void {
        //Hook Method
    }
}
