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
            // res.render("../routes"));
            res.sendfile('./src/views/routes.html')
        );
    }

    private printRoutes(): string[] {
        let routes: string[] = [];
        this.express._router.stack.forEach(r => {
            if (r.route && r.route.path) {
                routes.push(r.route.path);
            }
        });
        return routes;
    }
}