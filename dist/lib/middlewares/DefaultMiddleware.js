"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonContentMiddleware_1 = require("./JsonContentMiddleware");
const ProtonMiddleware_1 = require("./ProtonMiddleware");
const cors = require("cors");
const helmet = require("helmet");
/**
 * @author Humberto Machado
 */
class DefaultMiddleware extends ProtonMiddleware_1.ProtonMiddleware {
    configMiddlewares() {
        this.express.use(helmet());
        this.express.use(cors(this.protonApplication.getConfig().cors));
        if (this.protonApplication.getConfig().defaultRoutes) {
            this.express.get('/proton/routes', (req, res, next) => {
                new JsonContentMiddleware_1.JsonContentMiddleware().jsonContentMiddlewareFunc({ req: req, res: res, next: next, app: this.protonApplication });
            }, (req, res) => {
                res.json(this.protonApplication.getRoutesList());
            });
        }
    }
}
exports.DefaultMiddleware = DefaultMiddleware;
//# sourceMappingURL=DefaultMiddleware.js.map