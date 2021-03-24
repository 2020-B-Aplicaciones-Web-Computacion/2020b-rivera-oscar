import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ModeloCarroEntity} from "./modeloCarro.entity";

@Injectable()
export class ModeloCarroService {

    constructor(
        @InjectRepository(ModeloCarroEntity)
        public modeloCarroEntity: Repository<ModeloCarroEntity>
    ){

    }

}