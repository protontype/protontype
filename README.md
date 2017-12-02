# ProtonType

[![Build Status](https://travis-ci.org/linck/protontype.svg?branch=develop)](https://travis-ci.org/linck/protontype)

[![NPM](https://nodei.co/npm/protontype.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/protontype/)

Um simples web framework feito em TypeScript.

O ProtonType tem como objetivo tornar simples e agradável o desenvolvimento de APIs REST e criação de modelos de banco de dados. Utilizando [Express](http://expressjs.com/ "") e [Sequelize ORM](http://docs.sequelizejs.com/ "") ajuda na criação de aplicações web robustas.

## Instalação
```bash
npm install protontype --save
```
 
## Models
Usa [TypeORM](http://typeorm.io/#/) por padrão para acesso a banco de dados

```javascript
@Entity()
export class TasksModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    title: string;
    @Column()
    done: boolean;
    @Column()
    userId: number;
}
```
## Middlewares
Suporta implementação de middlewares

```javascript
export class TasksMiddleware extends ProtonMiddleware {
    @Middleware()
    printTaskTitle(params: MiddlewareFunctionParams) {
        cosole.log(params.req.body.title);
        params.next();
    }
}
```

## Router
Rotas básicas de CRUD já implementadas CrudRouters

```javascript
 @RouterClass({
    baseUrl: "/tasks",
    model: TasksModel,
    middlewares: [new TasksMiddleware()]
})
export class TasksRouter extends TypeORMCrudRouter {
    /*
    GET / - Lista todos registros
    POST / - Cria um registro
    GET /:id - Consulta um registro
    PUT /:id - Atualiza um registro
    DELETE /:id - Remove um registro
    */

    //Novas rotas customizadas ....
}
```

Ou pode implementar rotas customizadas
```javascript
 @RouterClass({
    baseUrl: "/tasks",
    model: TasksModel,
    middlewares: [new TasksMiddleware()]
})
export class TasksRouter extends ExpressRouter {
    @Route({
        endpoint: '/test/msg',
        method: Method.GET,
        middlewares: [new OtherMiddleware()]
    })
    routeTest(params: RouterFunctionParams) {
        console.log("Hello!");
    }
}
```



## Bootstraping

```javascript
    new ProtonApplication()
        .addRouter(new TasksRouter())
        .addMiddleware(new SomeoneGlobalMiddleware())
        .bootstrap();
```
## Documentação
<https://protontype.github.io/protontype-docs>

## NPM
<https://www.npmjs.com/package/protontype>

## Exemplos
<https://github.com/protontype/protontype-sample>
<https://github.com/protontype/protontype-sequelize-sample>


[English](https://github.com/linck/protontype/blob/develop/README_en.md "") / [Português](https://github.com/linck/protontype/blob/develop/README.md "")
