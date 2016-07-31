import { ExpressApplication } from './../libs/ExpressApplication';
import { ExpressRouter } from './ExpressRouter';
import {UsersModel} from "../models/UsersModel";

/**
 * Rotas para Users
 */
export class UsersRouter extends ExpressRouter {
    private users: any;

    constructor(expressApplication: ExpressApplication) {
        super(expressApplication);
        this.users = expressApplication.getSequelizeDB().getModel(new UsersModel());
    }

    public start(): void {
        this.addTaskRoutes();
        console.log(">>> Rotas para Users carregadas <<<");
    }

    private addTaskRoutes(): void {
        this.express.get("/users", (req, res) => {
            this.users.findAll({})
                .then((users) => {
                    res.json({users: users});
                });
        });
    }
}

