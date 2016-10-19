ProtonType
-------

Um simples microframework feito em Typescript para criação de APIs REST usando Exress e ORM Sequelize. 

Contribuição
------------
Fique à vontade para contribuir com seus códigos!! :D

**Instalando e compilando o projeto**
 1. npm install
 2. npm start
 3. npm link

Uso
---
**Dependências**
_______________

 - body-parser
 - express
 - sequelize
 - sqlite3

**Configurando aplicação**
_______________
Criar um arquivo chamado **proton.json** na raiz do projeto.
*proton.json*:

    {
      "port": "3000",
      "database": {
        "name": "tasks-api",
        "username": " ",
        "password": "",
        "params": {
          "dialect": "sqlite",
          "storage": "tasks.sqlite",
          "define": {
            "underscored": "true"
          }
        }
      }
    }

As configurações podem ser acessada através da classe ***Config***:
import {`Config`} from "../application/Config";

**Criando Models**
_______________
Para criar um Model, deve-se criar uma classe que *extends* de ***BaseModel***.
O mapeamento do banco de dados é feita a através da anotação ***@Model*** que possui os seguntes parâmetros:

 - **name**: Nome do model
 - **definition**: Definição das colunas. As definições é o mesmo objeto de [definição do Sequelize](http://docs.sequelizejs.com/en/v3/docs/models-definition/).

Exemplo:

    import { ModelNames } from './ModelNames';
    import { BaseModel, BelongsTo, DataTypes, Model, SequelizeBaseModelAttr } from 'protontype';
    
    @Model({
        name: ModelNames.TASKS,
        definition: {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            done: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }
    })
    export class TasksModel extends BaseModel<Task> {

    }

    export interface Task extends SequelizeBaseModelAttr {
        title: string;
        done: boolean;
        user_id: number;
    }

**Criando Middlewares**
_______________
Criar classe que *extends* Middleware e implementar o método ***configMiddlewares()***

Exemplo:

    import {Middleware} from "./Middleware";
    import * as bodyParser from 'body-parser';
    import {Config} from "../application/Config";
    
    export class DefaultMiddleware extends Middleware {
        private port: number = Config.port;
        private jsonSpaces: number = 2;

    public configMiddlewares(): void {
        this.express.set("port", this.port);
        this.express.set("json spaces", this.jsonSpaces);
        this.express.use(bodyParser.json());
        this.express.use((req, res, next) => {
            delete req.body.id;
            next();
        })
    }
}

**Criando Routers**
_______________
 - Criar uma classe que *extends* ***ExpressRouter***
 - Será preciso implementar o método `getBaseUrl(): string` informando a
   URL base das rotas criadas na classe.
 - Implementar o médoto `getModelInstances(): BaseModel[]` informando as instancias dos Models usados no Router.
 - Criar métodos (funções) anotados com ***@Route***.
	 - Todo método ***@Route*** deve ter o formato: `nomeMetodo(req, res, model)`

Exemplo:

    import {TasksModel} from "../models/TasksModel";
    import {ExpressRouter} from "protontype";
    import {Method} from "protontype";
    import {Route} from "protontype";
    
    @RouterClass({
        baseUrl: "/tasks",
        modelInstances: [new TasksModel()]
    })
    export class TasksRouter extends ExpressRouter {
        @Route({
            method: Method.GET,
            endpoint: '/',
            modelName: TasksModel.MODEL_NAME,
            useAuth: true
        })
        public findAllTasks(req, res, model) {
            model.findAll({})
                .then(result => res.json(result))
                .catch(error => this.sendErrorMessage(res, error));
        }
  
        @Route({
            method: Method.POST,
            endpoint: '/',
            modelName: TasksModel.MODEL_NAME
        })
        public createTask(req, res, model) {
            model.create(req.body)
                .then(result => res.json(result))
                .catch(error => this.sendErrorMessage(res, error));
        }
    
        @Route({
            method: Method.GET,
            endpoint: '/:id',
            modelName: TasksModel.MODEL_NAME
        })
        public findOneTask(req, res, model) {
            model.findOne({where: req.params})
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => this.sendErrorMessage(res, error));
        }
    
        @Route({
            method: Method.PUT,
            endpoint: '/:id',
            modelName: TasksModel.MODEL_NAME
        })
        public updateTask(req, res, model) {
            model.update(req.body, {where: req.params})
                .then(result => res.sendStatus(204))
                .catch(error => this.sendErrorMessage(res, error));
        }
    
        @Route({
            method: Method.DELETE,
            endpoint: '/:id',
            modelName: TasksModel.MODEL_NAME
        })
        public deleteTask(req, res, model) {
            model.destroy({where: req.params})
                .then(result => res.sendStatus(204))
                .catch(error => this.sendErrorMessage(res, error));
        }
    }

No decorator ***@Route*** o parâmetro **modelName** é opcional como no exemplo abaixo:

    @Route({
            method: Method.GET,
            endpoint: 'hello'
    })
    public hello(req, res, model) {
        res.json('Hello!');
    }
    
**Obs**: *Caso tenha configurações de rotas com endpoints repetidos a primeira a ser carregada será usada, as outras serão ignoradas.*

**BaseCrudRouter**
_______________
A classe BaseCrudRouter provê as operações básicas de CRUD, sem a necessidade de implementação adicional.

Exemplo:

    import { TasksModel } from '../models/TasksModel';
    import { BaseCrudRouter, RouterClass, UseAuth } from 'protontype';

    @UseAuth()
    @RouterClass({
        baseUrl: "/tasks",
        modelInstances: [new TasksModel()]
    })
    export class TasksRouter extends BaseCrudRouter {

    }

Esta classe já proverá as rotas:

 - **GET /** - Lista todos registros
 - **POST /** - Cria um registro
 - **GET /:id** - Consulta um registro
 - **PUT /:id** - Atualiza um registro
 - **DELETE /:id** - Remove um registro

**Iniciando aplicação**
_______________
    import {ExpressApplication} from "protontype";
    import {DefaultMiddleware} from "protontype";
    import {TasksRouter} from "./router/TasksRouter";
    
    let expressApp = new ExpressApplication();
    expressApp
        .addMiddleware(new DefaultMiddleware())
        .addRouter(new TasksRouter())
        .bootstrap();


Configuração Compilador Typescript
----------------------------------

As seguintes configurações no ***tsconfig.json*** são necessárias para o funcionamento.

    {
      "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
        ...
      }
    }


**Exemplo de uso** 
-------------------------
https://github.com/linck/protontype-example