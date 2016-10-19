import { Config } from '../application/Config';
import { Middleware } from './Middleware';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
/**
 * @author Humberto Machado
 */
export class DefaultMiddleware extends Middleware {
    private port: number = Config.port;
    private jsonSpaces: number = 2;

    public configMiddlewares(): void {
        this.express.set("port", this.port);
        this.express.set("json spaces", this.jsonSpaces);
        this.express.use(helmet());
        this.express.use(cors(Config.cors));
        this.express.use(bodyParser.json());
        this.express.use((req, res, next) => {
            delete req.body.id;
            next();
        })
    }

}
