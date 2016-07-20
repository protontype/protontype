import { ExpressRouter } from './ExpressRouter';
import { Tasks } from '../models/Tasks';

/**
 * Rotas para Taks
 */
export class TasksRouter extends ExpressRouter {
    private tasks: Tasks;

    constructor(express: any){
        super(express);
        this.tasks = new Tasks();
    }

    public start() {
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

