import { PartialType } from '@nestjs/mapped-types';
import { CreateCuotaDto } from './create-cuota.dto';

export class UpdateCuotaDto extends PartialType(CreateCuotaDto) {}
