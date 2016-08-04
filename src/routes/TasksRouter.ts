import {ExpressApplication} from './../libs/ExpressApplication';
import {ExpressRouter, Router} from './ExpressRouter';
import {TasksModel} from '../models/TasksModel';

/**
 * Rotas para Taks
 */
@Router({
    modelName: TasksModel.MODEL_NAME
})
export class TasksRouter extends ExpressRouter {

    constructor(expressApplication:ExpressApplication) {
        super(expressApplication);
    }

    public start():void {
        this.addTaskRoutes();
        console.log(">>> Rotas para Tasks carregadas <<<");
    }

    private addTaskRoutes():void {
        this.express.route("/tasks")
            .get((req, res) => {
                this.model.findAll({})
                    .then(result => res.json(result))
                    .catch(error => this.sendErrorMessage(res, error));
            })
            .post((req, res) => {
                this.model.create(req.body)
                    .then(result => res.json(result))
                    .catch(error => this.sendErrorMessage(res, error));
            });

        this.express.route("/tasks/:id")
            .get((req, res) => {
                this.model.findOne({where: req.params})
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
                this.model.update(req.body, {where: req.params})
                    .then(result => res.sendStatus(204))
                    .catch(error => this.sendErrorMessage(res, error));

            })
            .delete((req, res) => {
                this.model.destroy({where: req.params})
                    .then(result => res.sendStatus(204))
                    .catch(error => this.sendErrorMessage(res, error));
            });
    }
}

