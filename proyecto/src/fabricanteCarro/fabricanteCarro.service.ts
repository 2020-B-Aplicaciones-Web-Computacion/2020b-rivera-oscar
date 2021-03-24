import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FabricanteCarroEntity} from "./fabricanteCarro.entity";
import {Repository} from "typeorm";

@Injectable()
export class FabricanteCarroService {
    constructor(
        @InjectRepository(FabricanteCarroEntity)
        public fabricanteCarroEntity: Repository<FabricanteCarroEntity>
    ){

    }
}