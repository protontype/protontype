import { TasksRouter }  from './routes/TasksRouter';
import { ExpressLoader } from "./libs/ExpressLoader";

let expressLoader = new ExpressLoader();
let app = expressLoader.bootstrap();

new TasksRouter(app).start();


