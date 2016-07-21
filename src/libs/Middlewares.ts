export class Middlewares {
    private express: any;
    private port: number = 3000;
    private jsonSpaces: number = 2;

    constructor(express: any) {
        this.express = express;
    }

    public startMiddlewares() {
        this.express.set("port", this.port);
        this.express.set("json spaces", this.jsonSpaces);
        // this.express.set('views', './src/views');
        // this.express.set('view engine', 'html');
    }
}