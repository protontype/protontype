"use strict";
const ProtonMiddleware_1 = require("./ProtonMiddleware");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
/**
 * @author Humberto Machado
 */
class DefaultMiddleware extends ProtonMiddleware_1.ProtonMiddleware {
    constructor() {
        super(...arguments);
        this.jsonSpaces = 2;
    }
    configMiddlewares() {
        this.express.set("port", this.protonApplication.getConfig().port);
        this.express.use(helmet());
        this.express.use(cors(this.protonApplication.getConfig().cors));
        if (!this.protonApplication.getConfig().contentType
            || this.protonApplication.getConfig().contentType == 'json') {
            this.express.set("json spaces", this.jsonSpaces);
            this.express.use(bodyParser.json());
            this.express.use((req, res, next) => {
                delete req.body.id;
                next();
            });
        }
        if (this.protonApplication.getConfig().defaultRoutes) {
            this.express.get('/proton/routes', (req, res) => {
                res.json(this.protonApplication.getRoutesList());
            });
        }
    }
}
exports.DefaultMiddleware = DefaultMiddleware;
//# sourceMappingURL=DefaultMiddleware.js.map