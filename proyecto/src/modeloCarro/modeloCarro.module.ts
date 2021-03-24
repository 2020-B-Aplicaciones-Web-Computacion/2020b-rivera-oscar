import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ModeloCarroEntity} from "./modeloCarro.entity";
import {ModeloCarroController} from "./modeloCarro.controller";
import {ModeloCarroService} from "./modeloCarro.service";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [ModeloCarroEntity],
            'default'
        )
    ],
    controllers: [ //controlarodes
        ModeloCarroController
    ],
    providers: [ //servicios declarados
        ModeloCarroService
    ],
    exports: [//servicios exportados
        ModeloCarroService
    ],
})

export class ModeloCarroModule {

}