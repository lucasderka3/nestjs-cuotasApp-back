import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreatePlaneDto {

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsNumber()
    @IsPositive()
    precio: number;

    @IsString()
    @IsNotEmpty()
    frecuenciaPago: string;


}
