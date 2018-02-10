"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const MiddlewareConfig_1 = require("./../decorators/MiddlewareConfig");
const ProtonMiddleware_1 = require("./ProtonMiddleware");
const body_parser_1 = __importDefault(require("body-parser"));
class JsonContentMiddleware extends ProtonMiddleware_1.ProtonMiddleware {
    jsonContentMiddlewareFunc(params) {
        params.res.header('Content-type', 'application/json');
        this.configureJsonProperties(params.app.getExpress());
        params.next();
    }
    configMiddlewares() {
        this.configureJsonProperties(this.express);
    }
    configureJsonProperties(express) {
        this.express.set("json spaces", 2);
        this.express.use(body_parser_1.default.json());
        this.express.use((req, res, next) => {
            delete req.body.id;
            next();
        });
    }
}
__decorate([
    MiddlewareConfig_1.Middleware(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JsonContentMiddleware.prototype, "jsonContentMiddlewareFunc", null);
exports.JsonContentMiddleware = JsonContentMiddleware;
//# sourceMappingURL=JsonContentMiddleware.js.map