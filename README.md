Typed API
---------

Um simples microframework feito em Typescript para criação de APIs REST usando Exress e ORM Sequelize. 

Contribuição
------------
**Instalando e compilando o projeto**
 1. npm install
 2. npm start
 3. npm link

Uso
---
**Dependências**

 - body-parser
 - express
 - sequelize
 - sqlite3

**Configurando aplicação**

Criar um arquivo chamado **taconfig.json** na raiz do projeto.

    taconfig.json:
    {
      "port": "3000",
      "database": {
        "name": "ntask",
        "username": " ",
        "password": "",
        "params": {
          "dialect": "sqlite",
          "storage": "ntask.sqlite",
          "define": {
            "underscored": "true"
          }
        }
      }
    }

As configurações podem ser acessada através da classe ***Config***:
import {`Config`} from "../libs/Config";

**Criando Models**

Para criar um Model, deve-se criar uma classe que *extends* de ***BaseModel***.
O mapeamento do banco de dados é feita a através da anotação ***@Model*** que possui os seguntes parâmetros:

 - **name**: Nome do model
 - **definition**: Definição das colunas. As definições é o mesmo objeto de [definição do Sequelize](http://docs.sequelizejs.com/en/v3/docs/models-definition/).

Exemplo:

    import * as DataTypes from "sequelize"
    import {SequelizeDB} from "typed-api/dist/libs/SequelizeDB";
    import {BaseModel} from "typed-api/dist/models/BaseModel";
    import {UsersModel} from "./UsersModel";
    import {Model} from "typed-api/dist/libs/SequelizeModelLoader";
    
    @Model({
        name: TasksModel.MODEL_NAME,
        definition: {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
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
    export class TasksModel extends BaseModel {
        public static MODEL_NAME = 'Tasks';
    
        public associate(sequelizeDB: SequelizeDB): void {
            //Caso exista alguma associação com outro model
        }
    }

**Criando Middlewares**

Criar classe que *extends* Middleware e implementar o método ***configMiddlewares()***

Exemplo:

    import {Middleware} from "./Middleware";
import * as bodyParser from 'body-parser';
import {Config} from "../libs/Config";

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

 - Criar uma classe que *extends* ***ExpressRouter***
 - Será preciso implementar o método `getBaseUrl(): string` informando a
   URL base das rotas criadas na classe.
 - Criar métodos (funções) anotados com ***@Route***.
	 - Todo método ***@Route*** deve ter o formato: `nomeMetodo(req, res, model)`

Exemplo:

    import {TasksModel} from "../models/TasksModel";
    import {ExpressRouter} from "typed-api/dist/routes/ExpressRouter";
    import {Method} from "typed-api/dist/routes/Method";
    import {Route} from "typed-api/dist/libs/RouteConfigLoader";
    
    /**
     * @author Humberto Machado
     * Router example using decorator @Route and model
     */
    export class TasksRouter extends ExpressRouter {
    
        public getBaseUrl(): string {
            return '/tasks';
        }
    
        @Route({
            method: Method.GET,
            endpoint: '/',
            modelName: TasksModel.MODEL_NAME
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

**Exemplo completo de uso** : https://gitlab.com/hunters/typed-api-example