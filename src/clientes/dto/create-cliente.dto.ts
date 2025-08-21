import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateClienteDto {

    @IsString()
    @IsNotEmpty({message: 'El nombre es obligatorio.'})
    nombre: string;

    @IsString()
    @IsNotEmpty({message: 'El apellido es obligatorio.'})
    apellido: string;

    @IsString()
    @IsNotEmpty()
    @Length(7, 10, {message: 'El DNI debe tener entre 7 y 10 caracteres'})
    dni: string;

    @IsEmail({}, {message: 'El email no es valido.'})
    email: string;

    @IsOptional()
    @IsString()
    telefono?: string;

    @IsOptional()
    @IsString()
    direccion?: string;


}
