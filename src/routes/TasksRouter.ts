import { ExpressApplication } from './../libs/ExpressApplication';
import { ExpressRouter } from './ExpressRouter';
import { TasksModel } from '../models/TasksModel';

/**
 * Rotas para Taks
 */
export class TasksRouter extends ExpressRouter {
    private taskModel: TasksModel;

    constructor(expressApplication: ExpressApplication){
        super(expressApplication);
        this.taskModel = new TasksModel(expressApplication.getDB());
    }


    public start(): void {
        this.addTaskRoutes();
        console.log(">>> Rotas para Tasks carregadas <<<");
    }

    private addTaskRoutes(): void {
        this.express.get("/tasks", (req, res) => {
            this.taskModel.findAll({})
                .then((tasks) => {
                    res.json({tasks: tasks});
                });
        });
    }
}

