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
            res.sendFile('routes.html', {"root": "./src/views"})
        );

        this.express.get("/routes", (req, res) =>
            res.json(this.listRoutes())
        );
    }

    private listRoutes(): Object[] {
        let routes: Object[] = [];
        this.express._router.stack.forEach(r => {
            if (r.route && r.route.path) {
                routes.push({path: r.route.path});
            }
        });
        return routes;
    }
}