import { JsonContentMiddleware } from './JsonContentMiddleware';
import { ProtonMiddleware } from './ProtonMiddleware';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
/**
 * @author Humberto Machado
 */
export class DefaultMiddleware extends ProtonMiddleware {

    public configMiddlewares(): void {
        this.express.use(helmet());
        this.express.use(cors(this.protonApplication.getConfig().cors));

        if (this.protonApplication.getConfig().defaultRoutes) {
            this.express.get('/proton/routes', (req, res, next) => {
                new JsonContentMiddleware().jsonContentMiddlewareFunc({req: req, res: res, next: next, app: this.protonApplication});
                next();
            }, (req, res) => {
                res.json(this.protonApplication.getRoutesList());
            });
        }

    }

}
