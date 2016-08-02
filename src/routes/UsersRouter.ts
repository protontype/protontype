import { ExpressApplication } from './../libs/ExpressApplication';
import { ExpressRouter, Router } from './ExpressRouter';
import {UsersModel} from "../models/UsersModel";

/**
 * Rotas para Users
 */
@Router({
    modelName: UsersModel.MODEL_NAME
})
export class UsersRouter extends ExpressRouter {
    // private users: any;

    constructor(expressApplication: ExpressApplication) {
        super(expressApplication);
        // this.users = expressApplication.getSequelizeDB().getModel(new UsersModel());
    }

    public start(): void {
        this.addTaskRoutes();
        console.log(">>> Rotas para Users carregadas <<<");
    }

    private addTaskRoutes(): void {
        this.express.route("/users")
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

        this.express.route("/users/:id")
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

