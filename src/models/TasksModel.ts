import {SequelizeModel} from "./SequelizeModel";
import {SequelizeDB} from "../libs/SequelizeDB";
import {UsersModel} from "./UsersModel";
import {Model} from '../libs/SequelizeModelLoader';

@Model(new TasksModel())
export class TasksModel implements SequelizeModel {
    public static MODEL_NAME = "Tasks";
    private Tasks: any;

    public getModelName(): string {
        return TasksModel.MODEL_NAME;
    }

    public defineModel(sequelize: any, DataType: any): any {
        this.Tasks = sequelize.define(this.getModelName(), {
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
        }, {});

        return this.Tasks;
    }

    public associate(sequelizeDB: SequelizeDB): void {
        this.Tasks.belongsTo(sequelizeDB.getModel(new UsersModel()));
        console.log('Associado models a TASK');
    }
}