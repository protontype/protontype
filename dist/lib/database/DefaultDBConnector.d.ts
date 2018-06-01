import { Connection, ConnectionOptions } from 'typeorm';
import { DBConnector } from './DBConnector';
export declare class DefaultDBConnector extends DBConnector<ConnectionOptions, Connection> {
    createConnection(options?: ConnectionOptions): Promise<Connection>;
}
export declare class Database {
    static getBD(): Connection;
}
