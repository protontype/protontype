import { ExpressRouter } from './ExpressRouter';

export class DefaultRouter extends ExpressRouter {

    public start(): void {
        this.express.get("/", (req, res) =>
            res.sendFile('routes.html', { "root": "./src/views" })
        );

        this.express.get("/routes", (req, res) =>
            res.json(this.listRoutes())
        );
        console.log(">>> Rotas Default carregadas <<<");
    }

    private listRoutes(): Object[] {
        let routes: Object[] = [];
        this.express._router.stack.forEach(r => {
            if (r.route && r.route.path) {
                routes.push({ path: r.route.path });
            }
        });
        return routes;
    }
}