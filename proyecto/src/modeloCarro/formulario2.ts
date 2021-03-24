import {
    Contains,
    IsEmail, IsIn, IsInt,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional, IsPositive,
    IsString, Max,
    MaxLength, Min,
    MinLength
} from "class-validator";

export class Formulario2{

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    nmodelo : string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    precio : number;

    @IsNotEmpty()
    @IsInt()
    @Min(1996)
    @Max(2021)
    anio : number;

    @IsNotEmpty()
    @IsInt()
    @Min(2)
    @Max(5)
    puertas : number;


    /*
            @IsNotEmpty()
            @IsString()
            @MinLength(2)
            @IsNumberString()
            cedula : string;

            @IsNotEmpty()
            @IsEmail()
            correo : string;

        @IsNotEmpty()
        @IsNumber()
        @IsPositive()
        tipo : number;

            @IsIn([true, false])
            soltero : boolean;*/
}