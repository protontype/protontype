import {ExpressApplication} from './../libs/ExpressApplication';
import {ExpressRouter} from './ExpressRouter';
import {TasksModel} from '../models/TasksModel';

/**
 * Rotas para Taks
 */
export class TasksRouter extends ExpressRouter {
    private tasks:any;

    constructor(expressApplication:ExpressApplication) {
        super(expressApplication);
        this.tasks = expressApplication.getSequelizeDB().getModel(new TasksModel());
    }

    public start():void {
        this.addTaskRoutes();
        console.log(">>> Rotas para Tasks carregadas <<<");
    }

    private addTaskRoutes():void {
        this.express.route("/tasks")
            .get((req, res) => {
                this.tasks.findAll({})
                    .then(result => res.json(result))
                    .catch(error => this.sendErrorMessage(res, error));
            })
            .post((req, res) => {
                this.tasks.create(req.body)
                    .then(result => res.json(result))
                    .catch(error => this.sendErrorMessage(res, error));
            });

        this.express.route("/tasks/:id")
            .get((req, res) => {
                this.tasks.findOne({where: req.params})
                    .then(result => {
                        if (result) {
                            res.json(result);
                        } else {
                            res.sendStatus(404);
                        }
                    })
                    .catch(error => this.sendErrorMessage(res, error));

            })
            .put((req, res) => {
                this.tasks.update(req.body, {where: req.params})
                    .then(result => res.sendStatus(204))
                    .catch(error => this.sendErrorMessage(res, error));

            })
            .delete((req, res) => {
                this.tasks.destroy({where: req.params})
                    .then(result => res.sendStatus(204))
                    .catch(error => this.sendErrorMessage(res, error));
            });
    }
}

