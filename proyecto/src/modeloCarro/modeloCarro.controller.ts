import {Body, Controller, Get, Header, HttpCode, Param, Post, Put, Query, Req, Res} from '@nestjs/common';
import {ModeloCarroService} from "./modeloCarro.service";
import {FindConditions, FindManyOptions, Like} from "typeorm";
import {FabricanteCarroEntity} from "../fabricanteCarro/fabricanteCarro.entity";
import {ModeloCarroEntity} from "./modeloCarro.entity";

@Controller('modeloCarro')
export class ModeloCarroController {

    constructor(private _modeloCarroService: ModeloCarroService){

    }

    @Post('')
    async crearMascotaREST(
        @Body()
        parametrosCuerpo
    ){
        return await this._modeloCarroService.modeloCarroEntity.save({
            nmodelo: parametrosCuerpo.nmodelo,
            fkUsuario: 1

        })
    }



    /*MOSTRAR MODELOS DE CARRO*/
    private fkFabricanteCarro
    @Get('modelosCarro')
    async obtenerModelosCarro(
        @Query()
            parametrosConsulta, //tomaré parametros de consulta
        @Res()
            response //AHORA, PARA CVISUALIZARLO EN LA PAGINA WEB QUIERO RESPONDER
    ){
        let take = 10
        let skip = 0;
        let order = 'ASC';


        if(parametrosConsulta.skip){
            skip = parametrosConsulta.skip;
        }
        if(parametrosConsulta.take){
            take = parametrosConsulta.take;
        }
        if(parametrosConsulta.order){
            order = parametrosConsulta.order as 'ASC' | 'DESC';
        }

        /*
        if (parametrosConsulta.fabricanteCarro) {
            this.fkFabricanteCarro = parametrosConsulta.fabricanteCarro;
        } else {
            this.fkFabricanteCarro = "1"
        }*/

        //let fk = parametrosConsulta.id
        if(parametrosConsulta.id){
            this.fkFabricanteCarro = parametrosConsulta.id;
        }

        //MALDITA SEAAAAA
        let consultaWhereOR: FindConditions<ModeloCarroEntity>[] = [
            {
                nmodelo: Like(parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'),
                fkFabricanteCarro: Like(this.fkFabricanteCarro ? this.fkFabricanteCarro : '%%'),
            }
        ];

        let consulta: FindManyOptions<ModeloCarroEntity> = {
            where: consultaWhereOR,
            take: take,
            skip: skip,
            order: {
                id: order === 'ASC' ? 'ASC' : 'DESC',
            },

        };

        //return this._usuarioService.usuarioEntity.findAndCount(consulta);


        let datos = await this._modeloCarroService.modeloCarroEntity.findAndCount(consulta); //guardamos esto en una variable. await para un servicio del repositorio
        response.render('modeloCarro/inicio', {
            datos : datos,
            parametrosConsulta: parametrosConsulta,

        })

    }
    /*MOSTRAR MODELOS DE CARRO*/




    /*CREAR MODELO DE CARRO*/

    @Get('crear-modeloCarro')
    async crearFabricateCarroVista(
        @Query()
            parametrosConsulta,
        @Res()
            response,
    ){
        let id = parametrosConsulta.id
        let data= await this._modeloCarroService.modeloCarroEntity.findOne(id)
        response.render("modeloCarro/crear",{
            modeloCarro:data})

    }

    @Post('crear-modeloCarro')
    async crearFabricanteCarroDesdeVista(
        @Query()
            parametrosConsulta,
        @Body()
            parametrosCuerpo,
        @Res()
            response,
    ){
        const respuesta = await this._modeloCarroService.modeloCarroEntity.save({
            nmodelo: parametrosCuerpo.nmodelo,
            precio: parametrosCuerpo.precio,
            anio: parametrosCuerpo.anio,
            puertas: parametrosCuerpo.puertas,
            fkFabricanteCarro: this.fkFabricanteCarro

        });
        response.redirect('/modeloCarro/modelosCarro?mensaje=Se ha creado el modelo ' + parametrosCuerpo.nmodelo)
    }

    /*CREAR MODELO DE CARRO*/

    /*ELIMINAR USUARIO*/
    @Get('eliminar-modeloCarro')
    async eliminarModeloCarroVista(
        @Query()
            parametrosConsulta,
        @Res()
            response,
    ){

        let id = parametrosConsulta.id
        let data= await this._modeloCarroService.modeloCarroEntity.findOne(id)
        response.render("modeloCarro/eliminar",{
            modeloCarro:data
        })
    }

    @Post('eliminar-modeloCarro')
    async eliminarModeloCarroDesdeVista(
        @Query()
            parametrosConsulta,
        @Res()
            response,
    ){
        let modNomEliminado = parametrosConsulta.nmodelo
        let id = parametrosConsulta.id
        await this._modeloCarroService.modeloCarroEntity.delete(id);
        response.redirect('/modeloCarro/modelosCarro?mensaje=El modelo ' + modNomEliminado + ' ha sido eliminado.')
    }
    /*ELIMINAR USUARIO*/

    /*EDITAR FABRICANTE*/

    @Get('editar-modeloCarro')
    async editarModeloCarroVista(
        @Query()
            parametrosConsulta,
        @Res()
            response,
    ){

        let id = parametrosConsulta.id
        let data= await this._modeloCarroService.modeloCarroEntity.findOne(id)
        response.render("modeloCarro/editar",{
            modeloCarro:data
        })
    }


    @Post('editar-modeloCarro')
    async editarModeloCarroDesdeVista(
        @Body()
            parametrosCuerpo,
        @Query()
            parametrosConsulta,
        @Res()
            response,
    ){
        let nuevosDatos = {
            nmodelo: parametrosCuerpo.nmodelo,
            precio: parametrosCuerpo.precio,
            anio: parametrosCuerpo.anio,
            puertas: parametrosCuerpo.puertas
        }

        const respuesta = await this._modeloCarroService.modeloCarroEntity.update({id:parametrosConsulta.id}, nuevosDatos);
        response.redirect('/modeloCarro/modelosCarro?mensaje=MODELO ACTUALIZADO')
    }
    /*EDITAR FABRICANTE*/


}