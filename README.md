[English](https://github.com/linck/protontype/blob/develop/README_en.md "") / [Português](https://github.com/linck/protontype/blob/develop/README.md "")

ProtonType
==========

Um simples web framework feito em TypeScript.

O ProtonType tem como objetivo tornar simples e agradável o desensolvimento de APIs REST e criação de modelos de banco de dados. Utilizando [Express](http://expressjs.com/ "") e [Sequelize ORM](http://docs.sequelizejs.com/ "") ajuda na criação de aplicações web robustas.


Configuração do projeto TypeScript
====================================

As seguintes configurações no **tsconfig.json** são necessárias para o
funcionamento.

```json

    {
      "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
      }
    }
    
```

Instalação
==========
```bash

npm install protontype --save

```

Quick Start - Criando uma API Completa em 5 passos
===========

Estrutura de pastas e configurações iniciais
--------

```bash

    mkdir proton-quickstart
    cd proton-quickstart
    npm init
    mkdir src
    npm install protontype --save
    
```

Criar o arquivo tsconfig.json na raiz do projeto

```json

    {
      "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "outDir": "dist"
      },
      "exclude": [
        "node_modules",
        "dist"
      ]
    }
    
```
 
Model
-------

Criar um arquivo ParticlesModel.ts

```javascript

    import { BaseModel, SequelizeBaseModelAttr, Model, DataTypes } from 'protontype';
    
    @Model({
        name: "Particles",
        definition: {
            name: {
                type: DataTypes.STRING
            },
            symbol: {
                type: DataTypes.STRING
            },
            mass: {
                type: DataTypes.BIGINT
            }
    
        }
    })
    export class ParticlesModel extends BaseModel<Particle> {
    
    }
    
    export interface Particle extends SequelizeBaseModelAttr {
        name: string;
        symbol: string;
        mass: number;
    }
    
```

Router
-------

Criar arquivo ParticlesRouter.ts

```javascript

    import { ParticlesModel } from './ParticlesModel';
    import { BaseCrudRouter, RouterClass } from 'protontype';
    
    @RouterClass({
        baseUrl: '/particles',
        modelInstances: [new ParticlesModel()]
    })
    export class ParticlesRouter extends BaseCrudRouter {
    
    }
    
```

 

Main
-------

Criar arquivo Main.ts

```javascript

    import { ParticlesRouter } from './ParticlesRouter';
    import { ProtonApplication } from 'protontype';
    
    new ProtonApplication()
        .addRouter(new ParticlesRouter())
        .bootstrap();
        
```
 

**Compilando e Rodando Aplicação**
```bash

    tsc
    node dist/Main.ts
    
```
 
Testando a API
-------

Por padrão, a aplicação usará um banco de dados sqlite. 
Será criado um arquivo proton.sqlite na raiz do projeto.

Os endpoints abaixo já estarão disponíveis:
-   **GET /particles** - Lista todos os registos da tabela Particles
-   **POST /particles** - Cria um registro na tabela Particles
-   **GET /particles/:id** - Consulta um registro da tabela Particles
-   **PUT /particles/:id** - Atualiza um registro da tabela Particles
-   **DELETE /particles/:id** - Remove um registro da tabela Particles

Podera testar através do app [Postman](https://www.getpostman.com/ "") ou outro da sua preferência.

**Código completo do quick start**

https://github.com/linck/proton-quickstart



Guia Completo
=============

**Configurando aplicação**
-------

Criar um arquivo chamado **proton.json** na raiz do projeto. 

```json
{
  "port": "3000",
  "database": {
    "name": "proton-example",
    "username": "",
    "password": "",
    "options": {
      "dialect": "sqlite",
      "storage": "proton.sqlite",
      "define": {
        "underscored": "true"
      }
    }
  },
  "defaultRoutes": true,
  "cors": {
    "origin": ["*"],
    "methods": ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    "allowedHeaders": ["Content-Type", "Authorization"]
  },
  "jwtSecret": "Pr0t0nT1p3",
  "jwtSession": {
    "session": false
  },
  "https": {
    "key": "./protontype.key",
    "cert": "./protontype.cert"
  }
}
```


**Criando Models**
--------

O **ProtonType** usa o [**ORM Sequelize**](http://docs.sequelizejs.com/en/v3/ "") para criação dos Models e acesso ao banco de dados.

Para criar um Model, deve-se criar uma classe que *extends* de **BaseModel**. O
mapeamento do banco de dados é feita a através da anotação @Model que possui os
seguntes parâmetros:

-   **name**: Nome do model
-   **definition**: Definição das colunas. O objeto usado para as definições é o mesmo de
    [definição do
    Sequelize](http://docs.sequelizejs.com/en/v3/docs/models-definition/).

Exemplo:

```javascript

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

```

**Carregamento dos Models**

Cada **BaseModel** será carregado automaticamente na hora da sua instanciação. Geralmente o model sera carregado quando for usado por um ***Router***, porém o carregamento poderá ser forçado através o **@LoadModel** decorator ou simplemente através do **new**  

```javascript

@LoadModel(new TaskModel())
export class UsersModel extends BaseModel<User> {

}

```

**Adicionando relacionamentos e outras configurações nos Models**


Um BaseModel permite sobreescrever o método *configure()*, que permite acessar a instancia do modelo Sequelize e os modelos já carregados e adicionar lógicas e configurações:
```javascript

export class UsersModel extends BaseModel<User> {
    public configure(): void {
        this.getInstance().beforeCreate((user: any) => {
            let salt: string = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        });

        this.getInstance().hasMany(this.ProtonDB.getModel("Tasks").getInstance());
    }
}

```

**Usando decorators para criar relacionamentos**

Alguns decorators estãos disponíveis para facilitar a adição dos relacionamentos:
```javascript

@HasMany(modelName: string)
@HasOne(modelName: string)
@BelongsTo(modelName: string)
@BelongsToMany(modelName: string, options: Sequelize.AssociationOptionsBelongsToMany)

```

Estes podem ser usados como nos exemplos abaixo:

```javascript

@HasMany(ModelNames.TASKS)
export class UsersModel extends BaseModel<User> {
    public configure(): void {
        this.getInstance().beforeCreate((user: any) => {
            let salt: string = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        });
    }
}

```

```javascript

@BelongsTo(ModelNames.USERS)
export class TasksModel extends BaseModel<Task> {
}

```

Para mais informações sobre as possibilidades de configurações e uso dos Models, consultar a documentação do Sequelize: http://docs.sequelizejs.com/en/v3/

**Criando Middlewares** 
--------

Criar classe que
*extends* Middleware e implementar o método **configMiddlewares()**

Exemplo:

```javascript

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

```

**Middleware de autenticação**

**Protontype** usa o projeto [passportjs.org](http://passportjs.org/ "") para autenticação das rotas.

Um middleware de autenticação deve ser uma classe que *extends* de **AuthMiddleware** e deve implementar o método:
```javascript
authenticate(): express.Handler
```

O exemplo abaixo demonstra um middleware de autenticação JWT

```javascript
export class JWTAuthMiddleware extends AuthMiddleware {
    private passportInstance: passport.Passport;
    private config: SpecificConfig = ProtonConfigLoader.loadConfig();

    public configMiddlewares(): void {
        this.passportInstance = passport;
        let userModel: UsersModel = this.protonApplication.getModel<UsersModel>(ModelNames.USERS);

        let params: StrategyOptions = {
            secretOrKey: this.config.jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeader()
        };

        const strategy: Strategy = new Strategy(params, async (payload: any, done: VerifiedCallback) => {
            try {
                let user: User = await userModel.getInstance().findById(payload.id);
                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }
                return done(null, false);
            } catch (error) {
                return done(error, null);
            }
        });
        this.passportInstance.use(strategy);
        this.protonApplication.getExpress().use(this.passportInstance.initialize());
    }

    public authenticate(): express.Handler {
        return this.passportInstance.authenticate("jwt", this.config.jwtSession);
    }

}
```
**Criando Routers**
--------

- Criar uma classe que
*extends* **ExpressRouter** informando a URL base das rotas criadas na classe. 
- As configurações do Router será feita através do decorator @RouterClass
- Criar métodos (funções) anotados com @Route. 
- Todo método
@Route deve ter o formato: `nomeMetodo(req, res, model)` , sendo o ***model*** opcional.

Exemplo:

```javascript
import {TasksModel} from "../models/TasksModel";
import {Method, Route, ExpressRouter} from "protontype";

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

```

A propriedade ``` useAuth: boolean ``` indica se a rota será autenticada pelo **middleware de autenticação**, caso este esteja implementado.

No decorator @Route, o parâmetro **modelName** é opcional como no exemplo abaixo:

```javascript

@Route({
        method: Method.GET,
        endpoint: 'hello'
})
public hello(req, res) {
    res.json('Hello!');
}

```

**Obs**: *Caso tenha configurações de rotas com endpoints repetidos, a primeira a
ser carregada será usada, as outras serão ignoradas.*

**BaseCrudRouter**
----

A classe BaseCrudRouter provê
as operações básicas de CRUD, sem a necessidade de implementação adicional.

Exemplo:

```javascript

import { TasksModel } from '../models/TasksModel';
import { BaseCrudRouter, RouterClass, UseAuth } from 'protontype';

@UseAuth()
@RouterClass({
    baseUrl: "/tasks",
    modelInstances: [new TasksModel()]
})
export class TasksRouter extends BaseCrudRouter {

}

```

Esta classe já proverá as rotas:

-   **GET /** - Lista todos registros
-   **POST /** - Cria um registro
-   **GET /:id** - Consulta um registro
-   **PUT /:id** - Atualiza um registro
-   **DELETE /:id** - Remove um registro


Caso um **BaseCrudRouter** possua mais de uma instacia de Models, serão criadas as rotas para cada instancia, sendo o padrão da url: 
```html

/baseUrl/modelName/...

```

Exemplo:
```html

/tasks/tasksmodel/

```
**Configurando autenticação no** ***BaseCrudRouter***

Para hablititar a autenticação em um **BaseCrudRouter** deve-se usar o decorator ``` @UseAuth()```. Este pode conter os parametros abaixo:

```javascript

@UseAuth({
    create: boolean, //Habilita a autenticação para rotas de criação
    update: boolean, //Habilita a autenticação para rotas de atualização
    read: boolean,   //Habilita a autenticação para rotas de leitura
    delete: boolean  //Habilita a autenticação para rotas de remoção
})

```


Iniciando aplicação 
-----

```javascript

let expressApp = new ProtonApplication();
expressApp
    .withAuthMiddleware(new JWTAuthMiddleware())
    .addRouter(new TasksRouter())
    .bootstrap();
    
```

Exemplo de uso completo
---

**https://github.com/linck/protontype-example**
