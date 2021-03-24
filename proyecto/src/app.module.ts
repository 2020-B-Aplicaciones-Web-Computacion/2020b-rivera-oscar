import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FabricanteCarroEntity} from "./fabricanteCarro/fabricanteCarro.entity";
import {ModeloCarroEntity} from "./modeloCarro/modeloCarro.entity";
import {FabricanteCarroModule} from "./fabricanteCarro/fabricanteCarro.module";
import {ModeloCarroModule} from "./modeloCarro/modeloCarro.module";

@Module({
  imports: [ TypeOrmModule.forRoot({
    name: 'default',
    type: 'mysql',
    port: 3066,
    username: 'oscar',
    password: 'oscar12345678',
    database: 'proyectoCarros',
    dropSchema: false,
    synchronize: true,
    entities: [
      FabricanteCarroEntity,
      ModeloCarroEntity,
    ]
  }),
    FabricanteCarroModule,
    ModeloCarroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
