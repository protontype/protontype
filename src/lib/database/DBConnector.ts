export abstract class DBConnector<OptionsType, ConnectionType> {
    abstract createConnection(config?: OptionsType): Promise<ConnectionType>;
}

export class ProtonDB<C> {
    public static dbConnection: any;
    public static getBD<C>(): C {
        return <C>this.dbConnection;
    }
}