import { ExpressApplication } from './libs/ExpressApplication';
import { TasksRouter }  from './routes/TasksRouter';

let expressApplication = new ExpressApplication();
expressApplication.bootstrap();

new TasksRouter(expressApplication).start();


