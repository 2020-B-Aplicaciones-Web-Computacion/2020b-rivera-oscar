import {
    Contains,
    IsEmail, IsIn,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional, IsPositive,
    IsString,
    MaxLength,
    MinLength
} from "class-validator";

export class Formulario{

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    nfabricante : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(7)
    tipo : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    //@IsNumberString()
    sede : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(25)
    //@IsNumberString()
    presidente : string;


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