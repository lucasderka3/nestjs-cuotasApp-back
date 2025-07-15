import { IsDateString, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateCuotaDto {

    @IsNumber()
    clienteId: number;

    @IsNumber()
    planId: number;

    @IsDateString()
    fechaInicio: string;

    @IsDateString()
    fechaFin: string;

    @IsNumber()
    @IsPositive()
    monto: number;

    @IsOptional()
    @IsString()
    observaciones?: string;
    
}
