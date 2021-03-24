import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";

const helmet = require("helmet")
const session = require('express-session')
const FileStore = require('session-file-store')(session);
var fileStoreOptions = {};

async function bootstrap() {
  const app: any = await NestFactory.create(AppModule);
  app.set('view engine', 'ejs');
  app.use(session({
    store: new FileStore(fileStoreOptions),
    secret: 'SUPER SECREETT',
    resave: true,//???
    saveUninitialized: true,//???
    cookie: {
      expires: new Date(Date.now()+(10*1000))//cuando se acaba una sesion se crea otr
    }

  }));
  app.use(cookieParser());
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
