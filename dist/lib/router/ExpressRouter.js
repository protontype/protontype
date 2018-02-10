"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("./../application/Logger");
const express_1 = __importDefault(require("express"));
/**
 * @author Humberto Machado
 * Express routes configurations
 */
class ExpressRouter {
    constructor() {
        this.logger = Logger_1.Logger.instance;
    }
    init(protonApplication) {
        this.express = protonApplication.getExpress();
        this.router = express_1.default.Router();
        this.express.use(this.getBaseUrl(), this.router);
        this.protonApplication = protonApplication;
        this.logger.info(`>>>> Configured routes to ${this.getBaseUrl()} <<<<`);
    }
    getBaseUrl() {
        return this.baseUrl;
    }
    sendErrorMessage(res, error) {
        res.status(412).json({ msg: error.message });
    }
    getRouter() {
        return this.router;
    }
    getRouteConfigs() {
        return this.routeConfgs;
    }
    addRouteConfig(config) {
        if (this.routeConfgs == null) {
            this.routeConfgs = [];
        }
        if (this.routeConfgs.filter(route => route.method == config.method && route.endpoint == config.endpoint).length == 0) {
            this.routeConfgs.push(config);
        }
    }
    getRouterMiddlewares() {
        return this.routerMiddlewares;
    }
}
exports.ExpressRouter = ExpressRouter;
//# sourceMappingURL=ExpressRouter.js.map