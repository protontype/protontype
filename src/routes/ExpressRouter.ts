/**
 * Express routes configurations
 */
export abstract class ExpressRouter {
    protected express: any;

    public abstract start(): void;

    constructor(express: any) {
        this.express = express;
        this.defaultRoutes();
    }

    private defaultRoutes(): void {
        this.express.get("/", (req, res) =>
            res.json({ status: "NTask API TEste" }));
        this.express.get("/routes", (req, res) =>
            res.json({ routes: this.express._router.stack }));
    }
}