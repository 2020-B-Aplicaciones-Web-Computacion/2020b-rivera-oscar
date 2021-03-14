import {Controller, ForbiddenException, Get, Session} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

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


// Clases - TYPESCRIPT

abstract class Nombre {
    public nombrePropiedad?: string; // undefined
    private apellidoPropiedad: string = 'Eguez';
    protected edad = 1; // number (Duck Typing)
    static comun: number = 10;

    propiedadPublica: string;

    constructor(
        propiedadPublicaParametro: string, // parametro
        public propiedadRapido: string, // transforma una propiedad
    ) {
        this.propiedadPublica = propiedadPublicaParametro;
        // this.propiedadPublicaParametro ERROR
        // this.propiedadRapido; OK
    }

    public funcionPublica(parametroString: string): void {
        // no hay return = undefined
    }

    private funcionPrivada(parametroString: string, // ? = puede ser undefined
                           parametroNumber?: number)  { // omitir :void (defecto)
        // no hay return = undefined
    }

    protected funcionPublica1(): number {
        return 1;
    }

    static funcionEstatica(): string {
        return 'string';
    }





}

