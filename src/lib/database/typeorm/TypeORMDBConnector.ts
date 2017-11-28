import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import { DBConnector, ProtonDB } from '../DBConnector';

export class TypeORMDBConnector implements DBConnector<ConnectionOptions, Connection> {
    createConnection(options?: ConnectionOptions): Promise<Connection> {
        return createConnection(options);
    }
}

export class TypeORMDB {
    public static getBD(): Connection {
        return <Connection>ProtonDB.dbConnection;
    }
}
