import {
  BadGatewayException,
  BadRequestException, Body,
  Controller,
  ForbiddenException,
  Get,
  Param, Post, Query, Req,
  Session
} from '@nestjs/common';
import { AppService } from './app.service';
import {FormularioCrearDto} from "./dto/formulario-crear.dto";
import {validate} from "class-validator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*SEGURIDAD, validacion*/
  @Post('validacion-formulario')
  async validacionFormulario(
      @Body() parametrosCuerpo
  ){
    const dtoFormulario = new FormularioCrearDto()
      dtoFormulario.nombre = parametrosCuerpo.nombre
    dtoFormulario.cedula = parametrosCuerpo.cedula
    dtoFormulario.correo = parametrosCuerpo.correo
    dtoFormulario.edad = parametrosCuerpo.edad
    dtoFormulario.soltero  = parametrosCuerpo.soltero

    const errores = await validate(dtoFormulario);
    if(errores.length > 0){
      console.error(JSON.stringify(errores))
      console.error(errores.toString())

      throw new BadRequestException('No esta enviando correctamente los aprametros')
    }else{
      return 'ok'
    }



  }


  /*SEGURIDAD*/


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  login(
      @Session() session,
      //@Param() parametrosConsulta //para poder usar estos parametros. PARAMETROS DE RUTA
      @Query() parametrosConsulta // PARÁMETROS DE CONSULTA
  ): string {
    if(parametrosConsulta.nombre && parametrosConsulta.apellido){//si me das el apellido y nombr.Si me das el nombre y apellido pues los guardo
      session.usuario = {
        nombre:parametrosConsulta.nombre,
        apellido:parametrosConsulta.apellido
      }
      if(parametrosConsulta.apellido === 'Rivera'){
        session.usuario.esAdministrador = true;
      }
      return 'El usuario se ha logueado';//te doy la mano
    }else{
      throw new BadRequestException('Usted no no está enviando el nombre y el apellido, perro')//400
    }
  }

  @Get('quien-soy')
  quienSoy(
      @Session() session,
  ): string {
    if (session.usuario){//si el usuario se ha guardado
      return session.usuario.nombre + ' ' + session.usuario.apellido;//devolvemos el nombre y apellido de quien se ha logueado
    } else {
      return 'No se ha logueado nadie, Julio';
    }
  }

  @Get('protegido')
  protegido(
      @Session() session,
  ): string {
    if (session.usuario){//verifico si hay login
      if (session.usuario.esAdministrador){//verifico si se trata de un administrador
        return 'CONTENIDO SUPER OCULTO'//muestro el contenido super secreto y apto solo pa los adminsitradores.
      } else {
        throw new ForbiddenException('No tienes el rol de Admin.');//puesto que es una ruta protegida, que salte un error.
      }
    } else {
      throw new ForbiddenException('No tienes el rol de Admin, colega.')
    }
  }

  @Get('logout')
  logout(
      @Session() session,
      @Req() request
  ): string {
    session.usuario = undefined;
    request.session.destroy();
    return 'Gracias por la visita.';
    }




}




/*
//Clases - TYPESCRIPT

abstract class Nombre{
  public nombrePropiedad?: string;//propiedad probable que no exista
  private apellidoPropiedad: string = 'Rivera';
  protected edad: number = 1; //a los numeros los ingleses los llaman Duck Typing
  static comun: number = 10;//propiedades y metodos publicos, privados o protected.

  propiedadPublica = 'Soy publico'; //si la propiedad es publica no es necesario ponerle public


  constructor(
      propiedadPublica:string,//manera de parametro
      public propiedadRapida:string//manera rapida

  ) {
      this.propiedadPublica = propiedadPublica
      this.propiedadRapida;//manera rapida
  }

  //funciones
  public funcionPublica(parametrosString): void{
    //no hay return
  }

  private funcionPrivada(parametroStr
  : string,
                         parametroNumber?: number){
    //no hay return
  }
  protected funcionPublic():number{
    return 1;

  }
  static funcionPublica(): string{
    return 'string';
  }

}



//variables primitivas 22 de marzp
//var variableUno
let variableDos

variableDos = 1 //este si

//variable inmutable (no se pueden reasignar)
const variableTres = 2;
//variableTres =3; no me deja ponerle otro valor, este no

//siempre usar variables const

const texto:string = ""
const textoComillasSimples:string = ''

const numeroEntero: number = 1;
const numeroDecimal: number = 1.34;

const fecha:Date = new Date();
const noDefinido = undefined;
const noHayNada = null;

//
class Usuario {
  constructor(
      public nombre: string,
      public apellido: string
  ) {
  }
}
const usuario: Usuario = new Usuario('Adrian', 'Eguez');
usuario.nombre = 'Vicente';
usuario.apellido = 'Sarzosa';
interface UsuarioInterface {
  nombre: string;
  apellido: string;
  edad?: number; // ? => Opcional // Valor por defecto es undefined
}
let objetoUsuario: UsuarioInterface = {
  nombre: 'Adrian',
  apellido: 'Eguez'
};


objetoUsuario.nombre;
objetoUsuario.apellido;
objetoUsuario.edad;
console.log(usuario);
console.log(objetoUsuario);


// PUNTEROS REFERENCIAS
// PRIMITIVAS
let edadAntigua = 22;
let otraEdad = edadAntigua; // VALOR
otraEdad = 60; // edadAntigua = 22; OK
// Objeto
let objetoEdad = {
  edad: 22,
};
let otraEdadObjeto = objetoEdad; // REFERENCIA
otraEdadObjeto.edad = 60;
console.log('objetoEdad', objetoEdad)
console.log('otraEdadObjeto', otraEdadObjeto)
objetoEdad.edad = 35;
console.log('objetoEdad', objetoEdad)
console.log('otraEdadObjeto', otraEdadObjeto)
let otraEdadObjetoClonado = {...objetoEdad}; // Clonación
otraEdadObjetoClonado.edad = 60;
console.log('objetoEdad', objetoEdad)
console.log('otraEdadObjetoClonado', otraEdadObjetoClonado)
objetoEdad.edad = 40;
console.log('objetoEdad', objetoEdad)
console.log('otraEdadObjetoClonado', otraEdadObjetoClonado)
// Arreglos
const arregloTodo = [1, '', true, null, new Date()];
const arregloNumeros: number[] = [1, 2, 3, 4, 5];
const arregloNumerosClonado: number[] = [...arregloNumeros];
const indice = arregloNumeros.findIndex(
    (numero) => { // Funcion Anonima xq no tiene nombre
      const elValorEsIgualAtres: boolean = numero === 3;
      return elValorEsIgualAtres  // Condicion -> boolean
    },
    // function () { -> Funcion Anonima xq no tiene nombre
    //
    // }
);
arregloNumeros[indice] = 6
// agregar al final
arregloNumeros.push(6)
// agregar al principio
arregloNumeros.unshift(0)
console.log(arregloNumeros);
// CONDICIONES -> Truty y Falsy
if (0) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if (1) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if (-1) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if ("") {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if ("a") {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if ({}) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if ({a:1}) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if ([]) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if ([1]) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if (null) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
if (undefined) {
  console.log('Truty');
} else {
  console.log('Falsy');
}
*/

