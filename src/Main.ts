import { ExpressApplication } from './libs/ExpressApplication';
import { DefaultRouter } from './routes/DefaultRouter';
import { TasksRouter } from './routes/TasksRouter';

let expressApp = new ExpressApplication();
expressApp
   .addRouter(new DefaultRouter(expressApp))
   .addRouter(new TasksRouter(expressApp))
   .bootstrap();


