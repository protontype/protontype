[Português](README.md) / [English](README_en.md)
# ProtonType 

<div align="center">
  <a href="https://protontype.github.io/">
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

A simple framework made with TypeScript.

The Protontype have with objective make simple the APIs REST development.

## Documentation
- [Full documentation](https://protontype.github.io/)

## Instalation
```bash
npm install protontype --save
```
 
## Models
Uses [TypeORM](http://typeorm.io/#/) by default database manipulation. But any framework can be used.

```typescript
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
Supports middlewares implementation

```typescript
export class TasksMiddleware extends BaseMiddleware {
    @Middleware()
    printTaskTitle(params: MiddlewareFunctionParams) {
        cosole.log(params.req.body.title);
        params.next();
    }
}
```

## Router
CRUD basic routes already implemented in ```CrudRouter```

```typescript
 @RouterClass({
    baseUrl: "/tasks",
    model: TasksModel,
    middlewares: [new TasksMiddleware()]
})
export class TasksRouter extends CrudRouter {
    /*
    GET / - Lists all records
    POST / - Creates a records
    GET /:id - Queries a records
    PUT /:id - Updates a records
    DELETE /:id - Removes a records
    */

    //New custom routes ....
}
```
Or can implements custom routes
```typescript
 @RouterClass({
    baseUrl: "/tasks",
    model: TasksModel,
    middlewares: [new TasksMiddleware()]
})
export class TasksRouter extends BaseRouter {
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

## Starting application

```typescript
new ProtonApplication()
    .addRouterAs(TasksRouter)
    .addMiddlewareAs(SomeoneGlobalMiddleware)
    .start();
```

## Examples
- [Basic example](https://github.com/protontype/protontype-sample)

- [Sequelize module example](https://github.com/protontype/protontype-sequelize-sample)

## Development version
```bash
npm install protontype@dev --save
```
