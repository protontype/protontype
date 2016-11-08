ProtonType
==========

A simple microframework make in typescript for creating REST APIs using
Exress and ORM Sequelize.


Typescript project configuration
====================================

The following settings in**tsconfig.json**are needed for
operation.

```json

    {
      "CompilerOptions": {
        "Target", "ES6"
        "Module", "commonjs"
        "EmitDecoratorMetadata": true,
        "ExperimentalDecorators": true
        ...
      }
    }
    
```

Installation
==========
```bash

npm install protontype --save

```

Quick Start - Creating a Complete API in 5 steps
===========

folder structure and initial settings
--------

```bash

    mkdir proton-quickstart
    cd proton-quickstart
    npm init
    mkdir src
    npm install protontype --save
    
```
 The project structure looks like this:
 

Create tsconfig.json file in the project root

```json

    {
      "compilerOptions": {
        "target", "ES6"
        "module", "commonjs"
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

Create a file ParticlesModel

```javascript

    import {BaseModel, SequelizeBaseModelAttr, Model, DataTypes} from 'protontype';
    
    @model ({
        name: "Particles"
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
    export class ParticlesModel extends BaseModel <Particle> {
    
    }
    
    export interface Particle extends SequelizeBaseModelAttr  {
        name: string;
        symbol: string;
        mass: number;
    }
    
```

Router
-------

Create file ParticlesRouter.ts

```javascript

    import { ParticlesModel} from './ParticlesModel';
    import {BaseCrudRouter, RouterClass} from 'protontype';
    
    @RouterClass ({
        baseUrl '/ particles'
        modelInstances: [new ParticlesModel ()]
    })
    export class ParticlesRouter extends BaseCrudRouter {
    
    }
    
```

 

Main
----

Create Main.ts file

```javascript

    import { ParticlesRouter } from './ParticlesRouter';
    import { ExpressApplication } from 'protontype';
    
    new ExpressApplication ()
        .addRouter (new ParticlesRouter ())
        .bootstrap ();
        
```
 

**Compiling and Running Application**

```bash

    tsk
    node dist / Main.ts
    
```
 
Testing API
-------

By default, the application uses an SQLite database.
It will create a proton.sqlite file in the project root.

Endpoints below will be available:
- **GET / particles** - Lists all records of the table Particles
- **POST / particles** - Create a record in the table Particles
- **GET / particles /: id** - Consult a record of Particles table
- **PUT / particles /: id** - Update a record of Particles table
- **DELETE / particles /: id** - Remove a record of Particles table

Will be able to test through the app [Postman](https://www.getpostman.com/ "") or another of your choice.

**Complete Code quick start**

https://github.com/linck/proton-quickstart



Complete guide
=============

**Configuring application**
-------

Create a file called**proton.json**in the project root.

```json
{
  "port": "3000"
  "data base": {
    "name": "proton-example"
    "username": "",
    "password": "",
    "options": {
      "dialect": "sqlite"
      "storage": "proton.sqlite"
      "define": {
        "underscored": "true"
      }
    }
  },
  "defaultRoutes": true,
  "cors": {
    "origin": [ "*"]
    "methods": [ "GET", "POST", "OPTIONS", "PUT", "patch", "DELETE"]
    "allowedHeaders": [ "Content-Type", "Authorization"]
  },
  "jwtSecret" "Pr0t0nT1p3"
  "jwtSession": {
    "Session": false
  },
  "https": {
    "key": "./protontype.key"
    "cert": "./protontype.cert"
  }
}
```


**Creating Models**
--------

The ProtonType use [**ORM Sequelize**](http://docs.sequelizejs.com/en/v3/ "") for the creation of Models and access to the database.

To create a Model, you must create a class that extends**of BaseModel**. O database mapping is made by @Model annotation that has the
folowing parameters:

- **Name**: model name
- **Definition**: Speaker Setting. The object used for the settings is the same
    [DefinitionSequelize](http://docs.sequelizejs.com/en/v3/docs/models-definition/).

Example:

```javascript

import { ModelNames }  from './ModelNames';
import { BaseModel, BelongsTo, DataTypes, Model, SequelizeBaseModelAttr } from 'protontype';

@model ({
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
export class TasksModel extends BaseModel <Task> {

}

Export Task extends SequelizeBaseModelAttr interface {
    title: string;
    done: boolean;
    user_id: number;
}

```

**Adding relationships and other settings in Models**


A BaseModel override allows **configure ()** method, which allows you to access the instance of Sequelize model and models already loaded and add logic and settings:
```javascript

export class UsersModel extends BaseModel <User> {
    public configure (): void {
        this.getInstance () beforeCreate ((user:. any) => {
            let salt: string = bcrypt.genSaltSync ();
            user.password = bcrypt.hashSync (user.password, salt);
        });

        this.getInstance () hasMany (this.sequelizeDB.getModel ( "Tasks") getInstance ().).;
    }
}

```

**Using decorators to create relationships**

Some decorators are divorced available to facilitate the addition of relationships:
```javascript

@HasMany (... ModelNames: string [])
@BelongsTo (... ModelNames: string [])

```

These can be used as in the examples below:

```javascript

@HasMany (ModelNames.TASKS)
export class UsersModel extends BaseModel <User> {
    public configure (): void {
        this.getInstance () beforeCreate ((user:. any) => {
            let salt: string = bcrypt.genSaltSync ();
            user.password = bcrypt.hashSync (user.password, salt);
        });
    }
}

```

```javascript

@BelongsTo (ModelNames.USERS)
export class TasksModel extends BaseModel <Task> {
}

```

For more information about the possibilities for settings and use of Models, refer to the documentation Sequelize: http://docs.sequelizejs.com/en/v3/

**Creating Middleware**
--------

Create class
**Extends** Middleware and implement the method **configMiddlewares()**

Example:

```javascript

import {Middleware} from "./Middleware";
import * from the bodyParser 'body-parser';
import {Settings} from "../application/Config";

export class DefaultMiddleware extends Middleware {
    private port: number = Config.port;
    private jsonSpaces: number = 2;

public configMiddlewares (): void {
    this.express.set ( "port" this.port);
    this.express.set ( "json spaces" this.jsonSpaces);
    this.express.use (bodyParser.json ());
    this.express.use ((req, res, next) => {
        delete req.body.id;
        next ();
    })
}

```

**Authentication middleware**

**Protontype** uses the project [passportjs.org](http://passportjs.org/ "") for authentication of the routes.

A middleware authentication must be a class that extends a**AuthMiddleware** and should implement the method:
```javascript
authenticate (): express.Handler
```

The following example demonstrates an authentication middleware JWT

```javascript
export class JWTAuthMiddleware extends AuthMiddleware {
    private passportInstance: passport.Passport;
    private config: SpecificConfig ProtonConfigLoader.loadConfig = ();

    public configMiddlewares (): void {
        this.passportInstance = passport;
        let userModel: UsersModel = this.expressApplication.getModel <UsersModel> (ModelNames.USERS);

        let params: StrategyOptions = {
            secretOrKey: this.config.jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeader ()
        };

        const strategy: Strategy = new Strategy (params, async (Payload: any, done: VerifiedCallback) => {
            try {
                let user: User = await userModel.getInstance () findById (payload.id);.
                if (user) {
                    return done (null, {
                        id: user.id,
                        email: user.email
                    });
                }
                return done (null, false);
            } Catch (error) {
                return done (error, null);
            }
        });
        this.passportInstance.use (strategy);
        this.expressApplication.getExpress () use (this.passportInstance.initialize ().);
    }

    public authenticate (): express.Handler {
        this.passportInstance.authenticate return ( "jwt" this.config.jwtSession);
    }

}
```
**Creating Routers**
--------

- Create a class
**Extends**ExpressRouter informing the base URL of the routes created in the class.
- The Router settings will be done by the decorator @RouterClass
 - You can be informed the Models that will be used in the Router.
- Create methods (functions) annotated with @Route.
- Every method
@Route Must have the format: `methodName (req, res, model)`, the model parameter is**optional**.

Example:

```javascript
import {TasksModel} from "../models/TasksModel";
import {Method, Route, ExpressRouter} from "protontype";

@RouterClass ({
    baseUrl "/ tasks"
    modelInstances: [new TasksModel ()]
})
export class TasksRouter extends ExpressRouter {
    @Route ({
        method: Method.GET,
        endpoint, '/',
        modelName: TasksModel.MODEL_NAME,
        useAuth: true
    })
    public findAllTasks (req res model) {
        model.findAll ({})
            .then (result => res.json (result))
            .catch (error => this.sendErrorMessage (res, error));
    }

    @Route ({
        method: Method.POST,
        endpoint, '/',
        modelName: TasksModel.MODEL_NAME
    })
    public createTask (req res model) {
        model.create (req.body)
            .then (result => res.json (result))
            .catch (error => this.sendErrorMessage (res, error));
    }

    @Route ({
        method: Method.GET,
        endpoint: '/: id'
        modelName: TasksModel.MODEL_NAME
    })
    public findOneTask (req res model) {
        model.findOne ({where: req.params})
            .then (result => {
                if (result) {
                    res.json (result);
                } Else {
                    res.sendStatus (404);
                }
            })
            .catch (error => this.sendErrorMessage (res, error));
    }

    @Route ({
        method: Method.PUT,
        endpoint: '/: id'
        modelName: TasksModel.MODEL_NAME
    })
    public updateTask (req res model) {
        model.update (req.body, {where: req.params})
            .then (result => res.sendStatus (204))
            .catch (error => this.sendErrorMessage (res, error));
    }

    @Route ({
        method: Method.DELETE,
        endpoint: '/: id'
        modelName: TasksModel.MODEL_NAME
    })
    public DeleteTask (req res model) {
        model.destroy ({where: req.params})
            .then (result => res.sendStatus (204))
            .catch (error => this.sendErrorMessage (res, error));
    }
}

```

The property `` useAuth: boolean `` indicates that the route will be authenticated by the authentication middleware, if it is implemented.

In the decorator @Route**modelName**parameter is optional as in the example below:

```javascript

@Route ({
        method: Method.GET,
        endpoint: 'hello'
})
public hello (req res model) {
    res.json ( 'Hello!');
}

```

**Note**: If you have routing settings with repeated endpoints, the first to be charged will be used, the others are ignored.

**BaseCrudRouter**
----

The class provides BaseCrudRouter
the basic CRUD operations without the need for additional implementation.

Example:

```javascript

import {TasksModel}  from '../models/TasksModel';
import {BaseCrudRouter, RouterClass, UseAuth} from 'protontype';

@UseAuth ()
@RouterClass ({
    baseUrl "/ tasks"
    modelInstances: [new TasksModel ()]
})
export class TasksRouter extends BaseCrudRouter {

}

```

This class already provide routes:

- **GET /**- List all records
- **POST /**- Create a record
- **GET /: id**- Consult a record
- **PUT /: id**- Update a record
- **DELETE /: id**- Remove a record


If a**BaseCrudRouter** has more than one instacia Models of the routes for each instance will be created with the default being the url:
`` Html
/ BaseUrl / modelName / ...
```

**Configuring authentication on **BaseCrudRouter**

To hablititar authentication in a**BaseCrudRouter** should use the decorator `` @UseAuth () ``. This may contain the parameters below:

```javascript
@UseAuth ({
    create: boolean, // Enables authentication to create routes
    update: boolean, // Enables authentication to update routes
    read: boolean, // Enables authentication for reading routes
    delete: boolean // Enables authentication for removal routes
})
```


starting application
-----

```javascript

let expressApp ExpressApplication = new ();
expressApp
    .withAuthMiddleware (new JWTAuthMiddleware ())
    .addRouter (new TasksRouter ())
    .bootstrap ();
    
```

Example of full use
---

**Https: //github.com/linck/protontype-example**