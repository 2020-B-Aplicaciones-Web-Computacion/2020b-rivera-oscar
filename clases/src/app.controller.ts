import { Controller, ForbiddenException, Get, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('quien-soy')
  quienSoy(
      @Session() session,
  ): string {
    if (session.usuario){
      return session.usuario + '' + session.usuario.apellido;
    } else {
      return 'No te has logueado';
    }
  }

  @Get('protegido')
  protegido(
      @Session() session,
  ): string {
    if (session.usuario){
      if (session.esAdministrador){
        return 'CONTENIDO SUPER OCULTO'
      } else {
        throw new ForbiddenException('No tienes el rol de Admin.');
      }
    } else {
      throw new ForbiddenException('No tienes el rol de Admin, colega.')
    }
  }

  @Get('logout')
  logout(
      @Session() session,
  ): string {
    if (session.usuario){
      return session.usuario + '' + session.usuario.apellido;
    } else {
      return 'No te has logueado';
    }
  }

}
