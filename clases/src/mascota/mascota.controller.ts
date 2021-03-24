import {Body, Controller, Get, Header, HttpCode, Param, Post, Put, Req, Res} from '@nestjs/common';
import {MascotaService} from "./mascota.service";

@Controller('mascota')
export class MascotaController{

    constructor(private _mascotaService: MascotaService){

    }

    @Post('')
    async crearMascotaREST(
        @Body()
        parametrosCuerpo
    ){
        return await this._mascotaService.mascotaEntity.save({
            nombre: parametrosCuerpo.nombre,
            fkUsuario: 1

        })
    }

}