import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res
} from '@nestjs/common';
import {request, response} from "express";
import {get} from "http";
import {FabricanteCarroService} from "./fabricanteCarro.service";
import {FindConditions, FindManyOptions, Like} from "typeorm";
import {FabricanteCarroEntity} from "./fabricanteCarro.entity";
import {validate} from "class-validator";
import {Formulario} from "./formulario";








@Controller("fabricanteCarro")
export class FabricanteCarroController {

    /*PARA LO DE LA BASE DE DATOS*/

    constructor(
        private _fabricanteCarroService: FabricanteCarroService,
    ){

    }
    //recibimos parametros de cuerpo y mandamos a crear, el nombre que es lo unico que tenemos
    @Post('')
    crearUsuario(
        @Body()
            ParametrosCuerpo
    ){
        return this._fabricanteCarroService.fabricanteCarroEntity.save({
            nfabricante: ParametrosCuerpo.nombre,
            tipo: ParametrosCuerpo.apellido
        })
    }





    /*MOSTRAR FABRICANTES DE CARRO*/

    @Get('fabricantesCarro')
    async obtenerUsuarios(
        @Query()
            parametrosConsulta, //tomaré parametros de consulta
        @Res()
            response //AHORA, PARA CVISUALIZARLO EN LA PAGINA WEB QUIERO RESPONDER
    ){
        let take = 10
        let skip = 0;
        let order = 'ASC';
        let id = parametrosConsulta.id

        if(parametrosConsulta.skip){
            skip = parametrosConsulta.skip;
        }
        if(parametrosConsulta.take){
            take = parametrosConsulta.take;
        }
        if(parametrosConsulta.order){
            order = parametrosConsulta.order as 'ASC' | 'DESC';
        }

        let consultaWhereAND: FindConditions<FabricanteCarroEntity>[] = [
            {
                id: 4, // and
                nfabricante: 'Carlos' // and ....
            }
        ];
        // WHERE usuario.id = 4 AND usuario.nombre = 'Carlos'
        let consultaWhereOR: FindConditions<FabricanteCarroEntity>[] = [
            {
                nfabricante: Like(parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'),
            //}, // OR

            //{
                //tipo: Like(parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'),
            }
        ];

        let consulta: FindManyOptions<FabricanteCarroEntity> = {
            where: consultaWhereOR,
            take: take,
            skip: skip,
            order: {
                id: order === 'ASC' ? 'ASC' : 'DESC',
            },

        };

        //return this._usuarioService.usuarioEntity.findAndCount(consulta);
        let datos = await this._fabricanteCarroService.fabricanteCarroEntity.findAndCount(consulta); //guardamos esto en una variable. await para un servicio del repositorio
        response.render('inicio', {
            datos : datos,
            parametrosConsulta: parametrosConsulta
        })
    }
    /*MOSTRAR FABRICANTES DE CARRO*/

    /*CREAR FABRICANTE DE CARRO*/

    @Get('crear-fabricanteCarro')
    crearFabricateCarroVista(
        @Res()
            response,
        @Query()
            parametrosConsulta,
    ){
        response.render('fabricanteCarro/crear', {
            parametrosConsulta: parametrosConsulta
        })
    }

    @Post('crear-fabricanteCarro')
    async crearFabricanteCarroDesdeVista(
        @Body()
            parametrosCuerpo,
        @Query()
            parametrosConsulta,
        @Res()
            response,
    ){

        /*SEGURIDAD, validacion*/
            let formulario = new Formulario()
            formulario.nfabricante = parametrosCuerpo.nfabricante
            formulario.tipo = parametrosCuerpo.tipo
            formulario.sede = parametrosCuerpo.sede
            formulario.presidente = parametrosCuerpo.presidente


            const errores = await validate(formulario);
            if(errores.length > 0){
                console.error(JSON.stringify(errores))
                console.error(errores.toString())

                //throw new BadRequestException('No esta enviando correctamente los aprametros')
                response.redirect('/fabricanteCarro/crear-fabricanteCarro?mensaje=Ingrese los datos correctamente.')

            }else{
                const respuesta = await this._fabricanteCarroService.fabricanteCarroEntity.save({
                    nfabricante: parametrosCuerpo.nfabricante,
                    tipo: parametrosCuerpo.tipo,
                    sede: parametrosCuerpo.sede,
                    presidente: parametrosCuerpo.presidente

                });
                response.redirect('/fabricanteCarro/fabricantesCarro?mensaje=Se ha creado el fabricante ' + parametrosCuerpo.nfabricante)
            }

        /*SEGURIDAD, validacion*/


        /*
        //esto estaba bien //

        const respuesta = await this._fabricanteCarroService.fabricanteCarroEntity.save({
            nfabricante: parametrosCuerpo.nfabricante,
            tipo: parametrosCuerpo.tipo,
            sede: parametrosCuerpo.sede,
            presidente: parametrosCuerpo.presidente

        });
        response.redirect('/fabricanteCarro/fabricantesCarro?mensaje=Se ha creado el fabricante ' + parametrosCuerpo.nfabricante)
        //esto estaba bien //
         */
    }

    /*CREAR FABRICANTE DE CARRO*/

    /*ELIMINAR USUARIO*/
    @Get('eliminar-fabricanteCarro')
      async eliminarFabricanteCarroVista(
        @Query()
        parametrosConsulta,
        @Res()
        response,
    ){

        let id = parametrosConsulta.id
        let data= await this._fabricanteCarroService.fabricanteCarroEntity.findOne(id)
        response.render("fabricanteCarro/eliminar",{
           fabricanteCarro:data
        })
    }

    @Post('eliminar-fabricanteCarro')
    async eliminarFabricantoCarroDesdeVista(
        @Query()
            parametrosConsulta,
        @Res()
            response,
    ){
        let fabNomEliminado = parametrosConsulta.nfabricante
        let id = parametrosConsulta.id
        await this._fabricanteCarroService.fabricanteCarroEntity.delete(id);
        response.redirect('/fabricanteCarro/fabricantesCarro?mensaje=El fabricante ' + fabNomEliminado + ' ha sido eliminado.')
    }
    /*ELIMINAR USUARIO*/



    /*EDITAR FABRICANTE*/

    @Get('editar-fabricanteCarro')
    async editarFabricanteCarroVista(
        @Query()
            parametrosConsulta,
        @Res()
            response,
    ){

        let id = parametrosConsulta.id
        let data= await this._fabricanteCarroService.fabricanteCarroEntity.findOne(id)
        response.render("fabricanteCarro/editar",{
            fabricanteCarro:data,
            parametrosConsulta: parametrosConsulta
        })
    }


    @Post('editar-fabricanteCarro')
    async editarFabricanteCarroDesdeVista(
        @Body()
            parametrosCuerpo,
        @Query()
            parametrosConsulta,
        @Res()
            response,
    ){
        /*
        let formulario = new Formulario()
        formulario.nfabricante = parametrosCuerpo.nfabricante
        formulario.tipo = parametrosCuerpo.tipo
        formulario.sede = parametrosCuerpo.sede
        formulario.presidente = parametrosCuerpo.presidente


        const errores = await validate(formulario);
        if(errores.length > 0){
            console.error(JSON.stringify(errores))
            console.error(errores.toString())


            let id = parametrosConsulta.id
            let data= await this._fabricanteCarroService.fabricanteCarroEntity.findOne(id)
            response.render("fabricanteCarro/editar",{
                fabricanteCarro:data,
                parametrosConsulta: parametrosCuerpo
            })
            //throw new BadRequestException('No esta enviando correctamente los aprametros')
            //response.redirect('/fabricanteCarro/editar-fabricanteCarro?mensaje=Ingrese los datos correctamente.')
            //response.redirect('/fabricanteCarro/editar-fabricanteCarro?id=<%=fabricanteCarro.id%>&nfabricante=<%=fabricanteCarro.nfabricante%>&tipo=<%=fabricanteCarro.tipo%>&sede=<%=fabricanteCarro.sede%>&presidente=<%=fabricanteCarro.presidente%>')
        }else{
            let nuevosDatos = {
                nfabricante: parametrosCuerpo.nfabricante,
                tipo: parametrosCuerpo.tipo,
                sede: parametrosCuerpo.sede,
                presidente: parametrosCuerpo.presidente
            }

            const respuesta = await this._fabricanteCarroService.fabricanteCarroEntity.update({id:parametrosConsulta.id}, nuevosDatos);
            response.redirect('/fabricanteCarro/fabricantesCarro?mensaje=FABRICANTE ACTUALIZADO')
        }*/


        //esto estaba bien //

        let nuevosDatos = {
            nfabricante: parametrosCuerpo.nfabricante,
            tipo: parametrosCuerpo.tipo,
            sede: parametrosCuerpo.sede,
            presidente: parametrosCuerpo.presidente
        }

        const respuesta = await this._fabricanteCarroService.fabricanteCarroEntity.update({id:parametrosConsulta.id}, nuevosDatos);
        response.redirect('/fabricanteCarro/fabricantesCarro?mensaje=FABRICANTE ACTUALIZADO')
        //esto estaba bien //

    }
    /*EDITAR FABRICANTE*/









    @Get("hola")
    @HttpCode(200)
    @Header('EPN', 'SISTEMAS')//cabecera
    hola(
        @Req()
            request,
    ) {
        return '<h1> Hola mundo http </h1> ' +
            '<img src = "https://estaticos.muyhistoria.es/media/cache/400x300_thumb/uploads/images/pyr/5811ef1f5cafe83a098b456d/borgona_0.jpg" alt="">'


    }







}







