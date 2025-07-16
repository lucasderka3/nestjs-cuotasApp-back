import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreatePagoDto {

    // @IsNumber()
    // @IsPositive()
    // monto: number;

    @IsString()
    @IsNotEmpty()
    metodoPago: string;

    @IsOptional()
    @IsString()
    observaciones?: string;

    @IsOptional()
    @IsDateString()
    fecha?: string;

    @IsNumber()
    cuotaId: number;

}
