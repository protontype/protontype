import { SequelizeDB } from './../libs/SequelizeDB';
import * as Sequelize from 'sequelize';

export class TasksModel {
    private Task: any;
    public static MODEL_NAME = "Tasks";

    constructor(sequelizeDB: SequelizeDB) {
        let sequelize = sequelizeDB.getSequelize();
        this.Task = sequelize.define(TasksModel.MODEL_NAME, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            done: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
                classMethods: {
                    associate: (models) => {
                        this.Task.belongsTo(models.Users);
                    }
                }
            });
    }

    public findAll(params: Object): any {
        return this.Task.findAll(params);
    }

    public getTask(): any {
        return this.Task;
    }
}