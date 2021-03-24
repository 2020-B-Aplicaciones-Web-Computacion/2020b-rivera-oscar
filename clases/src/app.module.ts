import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//importaciones de mis nuevos modulos mascota y usuario
import {MascotaModule} from './mascota/mascota.module';
import {UsuarioModule} from './usuario/usuario.module';
//importaciones de mis nuevos entidades mascota y usuario
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MascotaEntity} from "./mascota/mascota.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CalculadoraModule} from "./Calculadora/calculadora.module";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        name: 'default',
        type: 'mysql',
        port: 3010,
        username: 'epn',
        password: 'epn12345678',
        database: 'web',
        dropSchema: false,
        synchronize: true,
        entities: [
            UsuarioEntity,
            MascotaEntity,
        ]
      }),
      MascotaModule,//importamos los modulos creados de mascota y usuario.
      UsuarioModule,
      CalculadoraModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
