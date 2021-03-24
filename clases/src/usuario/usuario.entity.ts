import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MascotaEntity} from "../mascota/mascota.entity";

@Entity('NombreTabla_EPN-USUARIO')
export class UsuarioEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        type:'varchar',
        length: 100,
        nullable: false,
        name: 'USU_NOMBRE'
    })
    nombre: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'USU_APELLIDO'
    })
    apellido: string;


    // OneToMany (Papa) FabricanteCarroEntity
    @OneToMany(
        type => MascotaEntity, // Clase de le entidad hijo
        mascota => mascota.fkUsuario)
    mascotas: MascotaEntity[];


}