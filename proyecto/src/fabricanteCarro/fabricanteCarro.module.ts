import { Module } from '@nestjs/common';
import {FabricanteCarroController} from "./fabricanteCarro.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FabricanteCarroEntity} from "./fabricanteCarro.entity";
import {FabricanteCarroService} from "./fabricanteCarro.service";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [FabricanteCarroEntity],
            'default'
        )
    ],
    controllers: [
        FabricanteCarroController//controlarodes
    ],
    providers: [ //servicios declarados
        FabricanteCarroService
    ],
    exports: [//servicios exportados
        FabricanteCarroService
     ],
})

export class FabricanteCarroModule {

}