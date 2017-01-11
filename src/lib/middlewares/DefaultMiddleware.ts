import { Middleware } from './Middleware';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
/**
 * @author Humberto Machado
 */
export class DefaultMiddleware extends Middleware {
    private jsonSpaces: number = 2;

    public configMiddlewares(): void {
        this.express.set("port", this.protonApplication.getConfig().port);
        this.express.set("json spaces", this.jsonSpaces);
        this.express.use(helmet());
        this.express.use(cors(this.protonApplication.getConfig().cors));
        this.express.use(bodyParser.json());
        this.express.use((req, res, next) => {
            delete req.body.id;
            next();
        })

        if (this.protonApplication.getConfig().defaultRoutes) {
            this.express.get('/proton/routes', (req, res) => {
                res.json(this.protonApplication.getRoutesList());
            });
        }

    }

}
