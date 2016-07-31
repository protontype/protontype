import {ExpressApplication} from './libs/ExpressApplication';
import {DefaultRouter} from './routes/DefaultRouter';
import {TasksRouter} from './routes/TasksRouter';
import {UsersRouter} from "./routes/UsersRouter";

let expressApp = new ExpressApplication();
expressApp
    .addRouter(new DefaultRouter(expressApp))
    .addRouter(new TasksRouter(expressApp))
    .addRouter(new UsersRouter(expressApp))
    .bootstrap();


