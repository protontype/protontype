ProtonType
==========

Um simples microframework feito em Typescript para criação de APIs REST usando
Exress e ORM Sequelize.

 

Configuração do projeto TypeScript
====================================

As seguintes configurações no **tsconfig.json** são necessárias para o
funcionamento.

```json

    {
      "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
        ...
      }
    }
    
```

 

Quick Start
===========

**Estrutura de pastas e configurações iniciais**

```bash

    mkdir proton-quickstart
    cd proton-quickstart
    mkdir proton-quickstart
    npm init
    mkdir src
    npm install protontype
    
```
 A estrutura do projeto ficará assim:
 

Criar o arquivo tsconfig.json na raiz do projeto

```json

    {
      "compilerOptions": {
        "target": "es6",
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
 

**Model**

Criar um arquivo ParticlesModel

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
 

**Router**

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

 

**Main**

Criar arquivo Main.ts

```javascript

    import { ParticlesRouter } from './ParticlesRouter';
    import { ExpressApplication } from 'protontype';
    
    new ExpressApplication()
        .addRouter(new ParticlesRouter())
        .bootstrap();
        
```
 

**Compilando e Rodando Aplicação**
```bash

    tsc
    node dist/Main.ts
    
```
 
**Testando a API**

Por padrão, a aplicação usará um banco de dados sqlite. Será criado um arquivo proton.sqlite na raiz do projeto.

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

Para criar um Model, deve-se criar uma classe que *extends* de **BaseModel**. O
mapeamento do banco de dados é feita a através da anotação @Model que possui os
seguntes parâmetros:

-   **name**: Nome do model

-   **definition**: Definição das colunas. As definições é o mesmo objeto de
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

**Criando Middlewares** 

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

**Criando Routers**

- Criar uma classe que
*extends* **ExpressRouter** 
string` informando a URL base das rotas criadas na classe. 
- As configurações do Router será feita através do decorator @RouterClass
 - Poderá ser informado os Models que serão usados no Router.
- Criar métodos (funções) anotados com @Route. 
- Todo método
@Route deve ter o formato: `nomeMetodo(req, res, model)` , sendo o ***model*** opcional.

Exemplo:

```javascript

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

```

No decorator @Route o parâmetro **modelName** é opcional como no exemplo abaixo:

```javascript

@Route({
        method: Method.GET,
        endpoint: 'hello'
})
public hello(req, res, model) {
    res.json('Hello!');
}

```

**Obs**: *Caso tenha configurações de rotas com endpoints repetidos a primeira a
ser carregada será usada, as outras serão ignoradas.*

**BaseCrudRouter**

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


Caso um **BaseCrudRouter** possua mais de uma instacia de Models as serão criadas as rotas para cada instancia, sendo o padrão da url: 
```html
/baseUrl/modelName/...
```

**Iniciando aplicação** 

```javascript

import
{ExpressApplication} from "protontype"; import {DefaultMiddleware} from
"protontype"; import {TasksRouter} from "./router/TasksRouter";

let expressApp = new ExpressApplication();
expressApp
    .addMiddleware(new DefaultMiddleware())
    .addRouter(new TasksRouter())
    .bootstrap();
    
```

**Exemplo de uso completo**

https://github.com/linck/protontype-example
