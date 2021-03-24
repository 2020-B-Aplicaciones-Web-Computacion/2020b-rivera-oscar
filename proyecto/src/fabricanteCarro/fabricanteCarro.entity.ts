import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {ModeloCarroEntity} from "../modeloCarro/modeloCarro.entity";

@Entity('fabricanteCarro')
export class FabricanteCarroEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        type:'varchar',
        length: 100,
        nullable: false,
        name: 'FAB_NOMBRE'
    })
    nfabricante: string

    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'FAB_TIPO'
    })
    tipo: string

    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'FAB_SEDE'
    })
    sede: string

    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'FAB_PRESIDENTE'
    })
    presidente: string


    // OneToMany (Papa) FabricanteCarroEntity
    @OneToMany(
        type => ModeloCarroEntity, // Clase de le entidad hijo
        modeloCarro => modeloCarro.fkFabricanteCarro)
    modelosCarro: ModeloCarroEntity[];


}