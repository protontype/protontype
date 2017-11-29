import { Connection, ConnectionOptions } from 'typeorm';
import { DBConnector } from '../DBConnector';
export declare class TypeORMDBConnector implements DBConnector<ConnectionOptions, Connection> {
    createConnection(options?: ConnectionOptions): Promise<Connection>;
}
export declare class TypeORMDB {
    static getBD(): Connection;
}
