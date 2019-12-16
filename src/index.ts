import 'reflect-metadata';
import * as path from 'path';
import { createConnection } from 'typeorm';
import * as Koa from 'koa';
const cors = require('@koa/cors');
//import * as cors from 'koa-cors';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as send from 'koa-send';
import { AppRoutes } from './routes';

createConnection()
  .then(async connection => {
    const app = new Koa();
    const router = new Router();

    AppRoutes.forEach(route => {
      router[route.method](route.path, route.action);
    });

    router.get('/', async ctx => {
      await send(ctx, path.join(__dirname, 'src/client/build', 'index.html'));
    });

    router.get('/(.*)', async ctx => {
      await send(ctx, 'src/client/build/index.html');
    });

    app.use(cors());
    app.use(bodyParser());
    app.use(serve(path.join(__dirname, '/client/build')));
    app.use(router.routes());
    app.use(router.allowedMethods());

    const port = process.env.PORT || 3001;

    app.listen(port);

    console.log(
      `Koa application is up and running at http://localhost:${port}`
    );
  })
  .catch(error => console.log(error));
