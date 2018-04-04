"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const JsonContentMiddleware_1 = require("./JsonContentMiddleware");
const ProtonMiddleware_1 = require("./ProtonMiddleware");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
/**
 * @author Humberto Machado
 */
class DefaultMiddleware extends ProtonMiddleware_1.ProtonMiddleware {
    configMiddlewares() {
        this.express.use(helmet_1.default());
        this.express.use(cors_1.default(this.protonApplication.getConfig().cors));
        if (this.protonApplication.getConfig().defaultRoutes) {
            this.express.get('/proton/routes', (req, res, next) => {
                new JsonContentMiddleware_1.JsonContentMiddleware().jsonContentMiddlewareFunc({ req: req, res: res, next: next, app: this.protonApplication });
                next();
            }, (req, res) => {
                res.json(this.protonApplication.getRoutesList());
            });
        }
    }
}
exports.DefaultMiddleware = DefaultMiddleware;
//# sourceMappingURL=DefaultMiddleware.js.map