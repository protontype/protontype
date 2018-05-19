import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import { DBConnector, ProtonDB } from './DBConnector';

export class DefaultDBConnector extends DBConnector<ConnectionOptions, Connection> {
    createConnection(options?: ConnectionOptions): Promise<Connection> {
        return createConnection(options);
    }
}

export class Database {
    public static getBD(): Connection {
        return <Connection>ProtonDB.getBD();
    }
}
