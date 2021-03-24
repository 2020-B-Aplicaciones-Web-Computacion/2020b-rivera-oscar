import {Body, Controller, Get, Header, HttpCode, Param, Post, Put, Query, Req, Res} from '@nestjs/common';
import {request, response} from "express";
import {get} from "http";
import {UsuarioService} from "./usuario.service";
import {FindConditions, FindManyOptions, Like} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";



@Controller("usuario")
export class UsuarioController {

    /*PARA LO DE LA BASE DE DATOS*/

    constructor(
        private _usuarioService: UsuarioService,
    ){

    }
    //recibimos parametros de cuerpo y mandamos a crear, el nombre que es lo unico que tenemos
    @Post('')
    crearUsuario(
        @Body()
            ParametrosCuerpo
    ){
        return this._usuarioService.usuarioEntity.save({
            nombre: ParametrosCuerpo.nombre,
            apellido: ParametrosCuerpo.apellido
        })
    }





    /*MOSTRAR USUARIOS*/

    @Get('usuarios')
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

        let consultaWhereAND: FindConditions<UsuarioEntity>[] = [
            {
                id: 4, // and
                nombre: 'Carlos' // and ....
            }
        ];
        // WHERE usuario.id = 4 AND usuario.nombre = 'Carlos'
        let consultaWhereOR: FindConditions<UsuarioEntity>[] = [
            {
                nombre: Like(
                    parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'
                ),
            }, // OR

            {
                apellido: Like(parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'
                ),
            }
        ];

        let consulta: FindManyOptions<UsuarioEntity> = {
            where: consultaWhereOR,
            //where: consultaWhereAND,
            take: take,
            skip: skip,
            order: {
                id: order === 'ASC' ? 'ASC' : 'DESC',
            },

        };

        //return this._usuarioService.usuarioEntity.findAndCount(consulta);
        let datos = await this._usuarioService.usuarioEntity.findAndCount(consulta); //guardamos esto en una variable. await para un servicio del repositorio

        response.render('inicio', {
            datos : datos,
            parametrosConsulta: parametrosConsulta
        })
    }
    /*MOSTRAR USUARIOS*/

    /*CREAR USUARIO*/

    @Get('crear-usuario')
    crearUsuarioVista(
        @Res()
            response,
    ){
        response.render('usuarios/crear')
    }

    @Post('crear-usuario')
    async crearUsuarioDesdeVista(
        @Body()
            parametrosCuerpo,
        @Res()
            response,
    ){
        const respuesta = await this._usuarioService.usuarioEntity.save({
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido
        });
        response.redirect('/usuario/usuarios?mensaje=Se ha creado wl usuario ' + parametrosCuerpo.nombre)
    }

    /*CREAR USUARIO*/

    /*ELIMINAR USUARIO*/
    @Get('eliminar-usuario')
      async eliminarUsuarioVista(
        @Query()
        parametrosConsulta,
        @Res()
        response,
    ){

        let id = parametrosConsulta.id
        let data= await this._usuarioService.usuarioEntity.findOne(id)
        response.render("usuarios/eliminar",{
           usuario:data
        })
    }

    @Post('eliminar-usuario')
    async eliminarUsuarioDesdeVista(
        @Query()
            parametrosConsulta,
        @Res()
            response,
    ){
        let userNomEliminado = parametrosConsulta.nombre
        let userApeEliminado = parametrosConsulta.apellido
        let id = parametrosConsulta.id
        await this._usuarioService.usuarioEntity.delete(id);
        response.redirect('/usuario/usuarios?mensaje=El usuario ' + userNomEliminado + ' ' + userApeEliminado +' ha sido eliminado.')
    }
    /*ELIMINAR USUARIO*/



    /*EDITAR USUARIO*/

    @Get('editar-usuario')
    async editarUsuarioVista(
        @Query()
            parametrosConsulta,
        @Res()
            response,
    ){

        let id = parametrosConsulta.id
        let data= await this._usuarioService.usuarioEntity.findOne(id)
        response.render("usuarios/editar",{
            usuario:data
        })
    }






    @Post('editar-usuario')
    async editarUsuarioDesdeVista(
        @Query()
            parametrosConsulta,
        @Body()
            parametrosCuerpo,
        @Res()
            response,
    ){

        await this._usuarioService.usuarioEntity.save({
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido
        });
        response.redirect('/usuario/usuarios?mensaje=Usuario actualizado ' + parametrosCuerpo.nombre)


        let userNomEliminado = parametrosConsulta.nombre
        let userApeEliminado = parametrosConsulta.apellido
        let id = parametrosConsulta.id
        await this._usuarioService.usuarioEntity.delete(id);
        response.redirect('/usuario/usuarios?mensaje=El usuario ' + userNomEliminado + ' ' + userApeEliminado +' ha sido eliminado.')
    }

    /*EDITAR USUARIO*/















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







