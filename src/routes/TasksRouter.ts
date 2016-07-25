import { ExpressApplication } from './../libs/ExpressApplication';
import { ExpressRouter } from './ExpressRouter';
import { Tasks } from '../models/Tasks';

/**
 * Rotas para Taks
 */
export class TasksRouter extends ExpressRouter {
    private tasks: Tasks;

    constructor(express: ExpressApplication){
        super(express);
        this.tasks = new Tasks(express.getDB());
    }

    public start(): void {
        this.addTaskRoutes();
        console.log(">>> Rotas para Tasks carregadas <<<");
    }

    private addTaskRoutes(): void {
        this.express.get("/tasks", (req, res) => {
            this.tasks.findAll({}, (tasks) => {
                res.json({tasks: tasks});
            })
        });
    }
}

