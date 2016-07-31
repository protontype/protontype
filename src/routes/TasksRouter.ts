import { ExpressApplication } from './../libs/ExpressApplication';
import { ExpressRouter } from './ExpressRouter';
import { TasksModel } from '../models/TasksModel';

/**
 * Rotas para Taks
 */
export class TasksRouter extends ExpressRouter {
    private task: any;

    constructor(expressApplication: ExpressApplication) {
        super(expressApplication);
        this.task = expressApplication.getSequelizeDB().getModel(new TasksModel());
    }

    public start(): void {
        this.addTaskRoutes();
        console.log(">>> Rotas para Tasks carregadas <<<");
    }

    private addTaskRoutes(): void {
        this.express.get("/tasks", (req, res) => {
            this.task.findAll({})
                .then((tasks) => {
                    res.json({tasks: tasks});
                });
        });
    }
}

