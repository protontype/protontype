import { ProtonMiddleware } from './ProtonMiddleware';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
/**
 * @author Humberto Machado
 */
export class DefaultMiddleware extends ProtonMiddleware {

    public configMiddlewares(): void {
        this.express.use(helmet());
        this.express.use(cors(this.protonApplication.getConfig().cors));

        if (this.protonApplication.getConfig().defaultRoutes) {
            this.express.get('/proton/routes', (req, res) => {
                res.json(this.protonApplication.getRoutesList());
            });
        }

    }

}
