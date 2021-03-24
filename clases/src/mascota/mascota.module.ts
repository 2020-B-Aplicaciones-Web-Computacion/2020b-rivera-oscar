import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MascotaEntity} from "./mascota.entity";
import {MascotaController} from "./mascota.controller";
import {MascotaService} from "./mascota.service";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [MascotaEntity],
            'default'
        )
    ],
    controllers: [ //controlarodes
        MascotaController
    ],
    providers: [ //servicios declarados
        MascotaService
    ],
    exports: [//servicios exportados
        MascotaService
    ],
})

export class MascotaModule{

}