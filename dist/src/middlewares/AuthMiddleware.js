"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Middleware_1 = require('./Middleware');
/**
 * @author Humberto Machado
 */
var AuthMiddleware = (function (_super) {
    __extends(AuthMiddleware, _super);
    function AuthMiddleware() {
        _super.apply(this, arguments);
    }
    return AuthMiddleware;
}(Middleware_1.Middleware));
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map