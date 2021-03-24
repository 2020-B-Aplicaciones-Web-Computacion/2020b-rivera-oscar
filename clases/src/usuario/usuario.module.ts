import { Module } from '@nestjs/common';
import {UsuarioController} from "./usuario.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [UsuarioEntity],
            'default'
        )
    ],
    controllers: [
        UsuarioController//controlarodes
    ],
    providers: [ //servicios declarados
        UsuarioService
    ],
    exports: [//servicios exportados
        UsuarioService
     ],
})

export class UsuarioModule{

}