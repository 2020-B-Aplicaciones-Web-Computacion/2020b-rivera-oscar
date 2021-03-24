import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import {FabricanteCarroEntity} from "../fabricanteCarro/fabricanteCarro.entity";

@Entity('modeloCarro')
export class ModeloCarroEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'MOD_NOMBRE',
    })
    nmodelo: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'MOD_PRECIO',
    })
    precio: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'MOD_ANIO',
    })
    anio: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'MOD_PUERTAS',
    })
    puertas: string


    // ManyToOne (Hijo) ModeloCarroEntity
    @ManyToOne(
        type => FabricanteCarroEntity, // Clase de le entidad papa
        fabricanteCarro => fabricanteCarro.modelosCarro)// referencia a nosotros
    fkFabricanteCarro;




}