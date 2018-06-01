"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const DBConnector_1 = require("./DBConnector");
class DefaultDBConnector extends DBConnector_1.DBConnector {
    createConnection(options) {
        return typeorm_1.createConnection(options);
    }
}
exports.DefaultDBConnector = DefaultDBConnector;
class Database {
    static getBD() {
        return DBConnector_1.ProtonDB.getBD();
    }
}
exports.Database = Database;
//# sourceMappingURL=DefaultDBConnector.js.map