import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as cookieParser from "cookie-parser";
//import helmet from "helmet";

//const session = require('express-session')
//const FileStore = require('session-file-store')(session);
var fileStoreOptions = {};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(session({
    //store: new FileStore(fileStoreOptions),
    //secret: 'SUPER SECREETT'
  //}));
  //app.use(cookieParser()); app.use(helmet());
  await app.listen(3000);
}
bootstrap();