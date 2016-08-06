import {SequelizeModel} from "./SequelizeModel";
import {SequelizeDB} from "../libs/SequelizeDB";

/**
 * Created by humberto.machado on 01/08/2016.
 */
export abstract class BaseModel implements SequelizeModel {
    protected model: any;
    protected name: string;
    protected definition: {};

    public getModelName(): string {
        return this.name;
    }

    public defineModel(sequelize: any, DataTypes: any): any {
        this.model = sequelize.define(this.getModelName(), this.definition, {});
        return this.model;
    }

    public associate(sequelizeDB: SequelizeDB): void {
        //Hook Method
    }
}
