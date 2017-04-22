[![NPM](https://nodei.co/npm/protontype.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/protontype/)

# ProtonType

Um simples web framework feito em TypeScript.

O ProtonType tem como objetivo tornar simples e agradável o desenvolvimento de APIs REST e criação de modelos de banco de dados. Utilizando [Express](http://expressjs.com/ "") e [Sequelize ORM](http://docs.sequelizejs.com/ "") ajuda na criação de aplicações web robustas.

## Instalação
```bash
npm install protontype --save
```
 
## Models

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
    @HasMany('SubatomicParticles')
    @BelongsTo('Atoms')
    export class ParticlesModel extends BaseModel<Particle> {
    
    }
    
    export interface Particle extends SequelizeBaseModelAttr {
        name: string;
        symbol: string;
        mass: number;
    }
```

## Router

```javascript
    import { ParticlesModel } from './ParticlesModel';
    import { BaseCrudRouter, RouterClass } from 'protontype';
    
    @RouterClass({
        baseUrl: '/particles',
        modelInstances: [new ParticlesModel()],
        middlewares: [new ParticlesMiddleware()]
    })
    export class ParticlesRouter extends BaseCrudRouter {

        @Route({
            endpoint: '/list',
            method: Method.GET,
            modelName: 'Particles',
            middlewares: [ new AccelerateParticlesMiddleware() ]
        })
        separateOneParticle(params: RouterFunctionParams) {
            params.res.send('Próton');
        }
    
    }
```

## Middlewares

```javascript
import { Middleware, MiddlewareFunctionParams, ProtonMiddleware } from 'protontype';
export class ParticlesMiddleware extends ProtonMiddleware {

    @Middleware()
    printParticleName(params: MiddlewareFunctionParams) {
        cosole.log('Próton');
        params.next();
    }
}
```

## Bootstraping

```javascript
    import { ParticlesRouter } from './ParticlesRouter';
    import { ProtonApplication } from 'protontype';
    
    new ProtonApplication()
        .addRouter(new ParticlesRouter())
        .addMiddleware(new ParticlesMiddleware())
        .bootstrap();
```
## Documentação
https://linck.github.io/protontype-docs

## NPM
https://www.npmjs.com/package/protontype

## Exemplos
<https://github.com/linck/protontype-example>

<https://github.com/linck/proton-quickstart>

[English](https://github.com/linck/protontype/blob/develop/README_en.md "") / [Português](https://github.com/linck/protontype/blob/develop/README.md "")
