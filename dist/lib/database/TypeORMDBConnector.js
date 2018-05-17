"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const DBConnector_1 = require("./DBConnector");
class TypeORMDBConnector {
    createConnection(options) {
        return typeorm_1.createConnection(options);
    }
}
exports.TypeORMDBConnector = TypeORMDBConnector;
class TypeORMDB {
    static getBD() {
        return DBConnector_1.ProtonDB.getBD();
    }
}
exports.TypeORMDB = TypeORMDB;
//# sourceMappingURL=TypeORMDBConnector.js.map