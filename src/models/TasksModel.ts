import {SequelizeDB} from "../libs/SequelizeDB";
import {UsersModel} from "./UsersModel";
import {Model} from '../libs/SequelizeModelLoader';
import * as DataTypes from "sequelize"
import {BaseModel} from "./BaseModel";

@Model({
    name: 'Tasks',
    definition: {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                DataTypes: true
            }
        },
        done: {
            type: DataTypes.BOOLEAN,
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