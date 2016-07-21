import { ExpressLoader } from './libs/ExpressLoader';
import { TasksRouter }  from './routes/TasksRouter';

let expressLoader = new ExpressLoader();
let app = expressLoader.bootstrap();

new TasksRouter(app).start();


