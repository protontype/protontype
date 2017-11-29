export declare abstract class DBConnector<OptionsType, ConnectionType> {
    abstract createConnection(config?: OptionsType): Promise<ConnectionType>;
}
export declare class ProtonDB<C> {
    static dbConnection: any;
    static getBD<C>(): C;
}
