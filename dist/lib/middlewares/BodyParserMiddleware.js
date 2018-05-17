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
Object.defineProperty(exports, "__esModule", { value: true });
const BaseMiddleware_1 = require("./BaseMiddleware");
const MiddlewareConfig_1 = require("../decorators/MiddlewareConfig");
class BodyParserMiddleware extends BaseMiddleware_1.BaseMiddleware {
    bodyParser(params) {
        if (params.req.body == undefined || params.req.body == null) {
            var data = '';
            params.req.setEncoding('utf8');
            params.req.on('data', (rawData) => data += rawData);
            params.req.on('end', () => {
                params.req.body = data;
                params.next();
            });
        }
        else {
            params.next();
        }
    }
}
__decorate([
    MiddlewareConfig_1.Middleware(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BodyParserMiddleware.prototype, "bodyParser", null);
exports.BodyParserMiddleware = BodyParserMiddleware;
//# sourceMappingURL=BodyParserMiddleware.js.map