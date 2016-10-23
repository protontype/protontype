"use strict";
const Middleware_1 = require('./Middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
/**
 * @author Humberto Machado
 */
class DefaultMiddleware extends Middleware_1.Middleware {
    constructor() {
        super(...arguments);
        this.jsonSpaces = 2;
    }
    configMiddlewares() {
        this.express.set("port", this.expressApplication.getConfig().port);
        this.express.set("json spaces", this.jsonSpaces);
        this.express.use(helmet());
        this.express.use(cors(this.expressApplication.getConfig().cors));
        this.express.use(bodyParser.json());
        this.express.use((req, res, next) => {
            delete req.body.id;
            next();
        });
    }
}
exports.DefaultMiddleware = DefaultMiddleware;
//# sourceMappingURL=DefaultMiddleware.js.map