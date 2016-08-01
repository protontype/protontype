import {SequelizeDB} from "../libs/SequelizeDB";
import {UsersModel} from "./UsersModel";
import {Model} from '../libs/SequelizeModelLoader';
import * as DataType from "sequelize"
import {BaseModel} from "./BaseModel";

@Model({
    name: 'Tasks',
    definition: {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }
})
export class TasksModel extends BaseModel {
    public associate(sequelizeDB: SequelizeDB): void {
        this.model.belongsTo(sequelizeDB.getModel(new UsersModel()));
        console.log('Associado models a TASK');
    }
}