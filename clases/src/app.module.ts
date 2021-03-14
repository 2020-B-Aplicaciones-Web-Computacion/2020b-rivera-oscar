import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MascotaModule} from './mascota/mascota.module';
import {UsuarioModule} from './usuario/usuario.module';

@Module({
  imports: [
    MascotaModule,//importamos los modulos creados de mascota y usuario.
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
