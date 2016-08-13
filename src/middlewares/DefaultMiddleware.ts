import {Middleware} from "./Middleware";
import * as bodyParser from 'body-parser';
import {Config} from "../libs/Config";
/**
 * @author Humberto Machado
 */
export class DefaultMiddleware extends Middleware {
    private port: number = Config.port;
    private jsonSpaces: number = 2;

    public configMiddlewares(): void {
        this.express.set("port", this.port);
        this.express.set("json spaces", this.jsonSpaces);
        this.express.use(bodyParser.json());
        this.express.use((req, res, next) => {
            delete req.body.id;
            next();
        })
    }

}
