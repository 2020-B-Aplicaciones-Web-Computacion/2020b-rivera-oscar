import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Entity('NombreTabla_EPN-MASCOTA')
export class MascotaEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: string

    // ManyToOne (Hijo) ModeloCarroEntity
    @ManyToOne(
        type => UsuarioEntity, // Clase de le entidad papa
        usuario => usuario.mascotas)// referencia a nosotros
    fkUsuario;




}