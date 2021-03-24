import {Body, Controller, Get, Header, HttpCode, Param, Post, Put, Query, Req, Res} from '@nestjs/common';
import {request} from "express";


@Controller("calculadora")
export class CalculadoraController {

    /*DEBER DE LA CALCULADORA*/

    /*SETEAR NOMBRE*/
    @Get("setear-nombre/:nombre")
    setearNombre(
        @Param()
            parametrosRuta,
        @Req()//
            request,
        @Res({passthrough: true})//esto es con lo que vamos a responder
            response,
    ) {
        console.log(request.cookies);//valor de la cookie en la peticion, lo que nos llega
        response.cookie("nombreUsuarioo", parametrosRuta.nombre)//para setear la cookie en la respuesta, lo que vamos a enviar
        return 'Cookie con nombre ' + parametrosRuta.nombre + " seteada";
    }


    /*SETEAR PUTUACIÓN*/
    @Get("setear-puntuacion/:puntuacion")
    setearPuntuacion(
        @Param()
            parametrosRuta,
        @Req()//
            request,
        @Res({passthrough: true})//esto es con lo que vamos a responder
            response,
    ) {
        console.log(request.cookies);//valor de la cookie en la peticion, lo que nos llega
        response.cookie("puntUsuario", parametrosRuta.puntuacion)//para setear la cookie en la respuesta, lo que vamos a enviar
        return 'Cookie con la puntuación ' + parametrosRuta.puntuacion + " seteada";
    }



    /*MULTIPLICACIÓN*/

    @Put("multiplicacion/:n1/:n2")//declaro los parametros de ruta
    @HttpCode(200)
    multiplicacion(
        @Param()
            parametrosRuta,
        @Req()
            request,
        @Res({passthrough: true})//PARA USAR EL RETURN EN LUGAR DE RESPOND
            response
    ) {


        /*var numberValue1 = Number(parametrosRuta.n1);
        var numberValue2 = Number(parametrosRuta.n2);

        console.log(parametrosRuta);
        return numberValue1 * numberValue2;*/

        if(request.cookies.puntUsuario>0){
            const numberValue1 = Number(parametrosRuta.n1);
            const numberValue2 = Number(parametrosRuta.n2);

            var resultado = numberValue1 * numberValue2

            response.cookie("puntUsuario", request.cookies.puntUsuario - resultado)
            return resultado;
        }else if(request.cookies.puntUsuario<=0){
            response.cookie("puntUsuario", 100)
            return 'Enhorabuena, ha ganado.'
        }
    }


    /*RESTA*/
    @Post("resta/")
    @HttpCode(201)
    resta(
        @Req()
            request,
        @Body()
            parametrosCuerpo,
        @Res({passthrough: true})//PARA USAR EL RETURN EN LUGAR DEL RESPOND
            response
    ) {
        /*var numberValue1 = Number(parametrosCuerpo.n1);
        var numberValue2 = Number(parametrosCuerpo.n2);

        response.header('RESULTADO-DE-LA-RESTA', numberValue1 - numberValue2)
        return 'El resultado de la resta está en un header.'*/

        if(request.cookies.puntUsuario>0){
            const numberValue1 = Number(parametrosCuerpo.n1);
            const numberValue2 = Number(parametrosCuerpo.n2);

            const resultado = numberValue1 - numberValue2

            response.header('RESULTADO-DE-LA-RESTA', resultado)
            response.cookie("puntUsuario", request.cookies.puntUsuario - resultado)
            return 'El resultado de la resta está en un header.'
        }else if(request.cookies.puntUsuario<=0){
            response.cookie("puntUsuario", 100)
            return 'Enhorabuena, ha ganado.'
        }

    }

    /*SUMA*/
    @Get("suma/")
    @HttpCode(200)
    suma(
        @Req()
            request,
        @Query()
            parametrosConsulta,
        @Res({passthrough: true})//esto es con lo que vamos a responder
            response,
    ) {

        /*var numberValue1 = Number(parametrosConsulta.n1);
        var numberValue2 = Number(parametrosConsulta.n2);

        return numberValue1 + numberValue2;*/

        if(request.cookies.puntUsuario>0){
            const numberValue1 = Number(parametrosConsulta.n1);
            const numberValue2 = Number(parametrosConsulta.n2);

            const resultado = numberValue1 + numberValue2

            response.cookie("puntUsuario", request.cookies.puntUsuario - resultado)
            return resultado;
        }else if(request.cookies.puntUsuario<=0){
            response.cookie("puntUsuario", 100)
            return 'Enhorabuena, ha ganado.'
        }
    }

    /*DIVISION*/
    @Get("division/")
    @HttpCode(201)
    division(

        @Req()
            request,
        @Res({passthrough: true})//esto es con lo que vamos a responder
            response,
    ) {

        if(request.cookies.puntUsuario>0){
            const numberValue1 = Number(request.headers.n1);
            const numberValue2 = Number(request.headers.n2);

            const resultado = numberValue1 / numberValue2

            response.cookie("puntUsuario", request.cookies.puntUsuario - resultado)
            return resultado;
        }else if(request.cookies.puntUsuario<=0){
            response.cookie("puntUsuario", 100)
            return 'Enhorabuena, ha ganado.'
        }
    }
    /*DEBER DE LA CALCULADORA*/

}