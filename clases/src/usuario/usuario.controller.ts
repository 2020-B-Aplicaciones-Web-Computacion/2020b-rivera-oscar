import {Controller, Get, HttpCode, Param, Post, Put, Req, Res} from '@nestjs/common';
import {request, response} from "express";
import {get} from "http";

@Controller("usuario")
export class UsuarioController {
    @Get("hola")
    @HttpCode(200)
    hola(){
        return  '<h1> hola mundo http </h1> ' +
                '<img src = "https://estaticos.muyhistoria.es/media/cache/400x300_thumb/uploads/images/pyr/5811ef1f5cafe83a098b456d/borgona_0.jpg" alt="">'


    }

    //este es el ulyimo punto, con el metodo que hayamos querido
    //Ayuda para los apram de ruta y respuesta en las cabeceras.
    @Post("parametros-ruta/:numeroUno/:numeroDos")
    @HttpCode(200)
    parametrosRuta(
        @Param()
        parametrosRuta,

        @Res({passthrough: true})//PARA USAR EL RETURN EN LUGAR DE RESPONSE
        response
    ){

        var numberValue1 = Number(parametrosRuta.numeroUno);
        var numberValue2 = Number(parametrosRuta.numeroDos);

        //console.log(sumar(5, parametrosRuta.numer));
        console.log(parametrosRuta);
        response.header("nueva-header", "otro valor")
        return numberValue1 - numberValue2;
    }

    //para lo de las cookies
    @Get("setear-nombre/:nombre")
    setearNombre(
        @Param()
        parametrosRuta,
        @Req()//
            request,
        @Res({passthrough:true})//esto es con lo que vamos a responder
            response,
    ){
        console.log(request.cookies);//valor de la cookie en la peticion
        response.cookie("nombreusuarioo", parametrosRuta.nombre)
        return 'Cookie con nombre ' + parametrosRuta.nombre + " seteada";
    }

    /*DEBERES*/

    @Put("parametros-rutax/:numeroUno/:numeroDos")
    @HttpCode(200)
    parametrosRutax(
        @Param()
            parametrosRutax,

        @Res({passthrough: true})//PARA USAR EL RETURN EN LUGAR DE RESPOND
            response
    ){
        var numberValue1 = Number(parametrosRutax.numeroUno);
        var numberValue2 = Number(parametrosRutax.numeroDos);

        console.log(parametrosRutax);
        return numberValue1 * numberValue2;
    }


}


