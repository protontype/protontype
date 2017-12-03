
# ProtonType 

<div align="center">
  <a href="https://typeorm.io/">
    <img src="https://avatars1.githubusercontent.com/u/34164645?s=200&v=4">
  </a>
  <br>
  <br>
	<a href="https://travis-ci.org/protontype/protontype">
		<img src="https://travis-ci.org/protontype/protontype.svg?branch=develop">
	</a>
	<a href="https://www.npmjs.com/package/protontype">
		<img src="https://badge.fury.io/js/protontype.svg">
	</a>
  <br>
  <br>
</div>

Um simples web framework feito em TypeScript.

O ProtonType tem como objetivo tornar simples e agradável o desenvolvimento de APIs REST e criação de modelos de banco de dados usando [TypeORM](http://typeorm.io/#/) por padrão. 

## Documentação
- [Documentação completa](https://protontype.github.io/protontype-docs)
- [API reference](https://protontype.github.io/protontype-api-reference/)

## Instalação
```bash
npm install protontype --save
```
 
## Models
Usa [TypeORM](http://typeorm.io/#/) por padrão para acesso a banco de dados. Mas pode ser usado qualquer estratégia.

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
Rotas básicas de CRUD já implementadas nos CrudRouters

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

## Iniciando a aplicação

```javascript
    new ProtonApplication()
        .addRouter(new TasksRouter())
        .addMiddleware(new SomeoneGlobalMiddleware())
        .bootstrap();
```

## Exemplos
- [Exemplo básico](https://github.com/protontype/protontype-sample)

- [Exemplo com o módulo do Sequelize](https://github.com/protontype/protontype-sequelize-sample)


[English](https://github.com/linck/protontype/blob/develop/README_en.md "") / [Português](https://github.com/linck/protontype/blob/develop/README.md "")
