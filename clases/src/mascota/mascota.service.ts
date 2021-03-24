import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MascotaEntity} from "./mascota.entity";

@Injectable()
export class MascotaService{

    constructor(
        @InjectRepository(MascotaEntity)
        public mascotaEntity: Repository<MascotaEntity>
    ){

    }

}