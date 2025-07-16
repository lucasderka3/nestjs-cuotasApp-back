import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClienteDto {

    @IsString()
    @IsNotEmpty({message: 'El nombre es obligatorio.'})
    nombre: string;

    @IsString()
    @IsNotEmpty({message: 'El apellido es obligatorio.'})
    apellido: string;

    @IsEmail({}, {message: 'El email no es valido.'})
    email: string;

    @IsOptional()
    @IsString()
    telefono?: string;

    @IsOptional()
    @IsString()
    direccion?: string;


}
