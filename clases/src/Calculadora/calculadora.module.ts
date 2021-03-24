import { Module } from '@nestjs/common';
import {CalculadoraController} from "./calculadora.controller";

@Module({
    imports: [

    ],
    controllers: [ //controlarodes
        CalculadoraController
    ],
    providers: [ //servicios declarados

    ],
    exports: [//servicios exportados

    ],
})

export class CalculadoraModule {

}