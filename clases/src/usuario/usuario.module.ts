import { Module } from '@nestjs/common';
import {UsuarioController} from "./usuario.controller";

@Module({
    imports: [

    ],
    controllers: [
        UsuarioController//controlarodes
    ],
    providers: [ //servicios declarados
    ],
    exports: [//servicios exportados
     ],
})

export class UsuarioModule{

}