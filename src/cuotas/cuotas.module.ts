import { Module } from '@nestjs/common';
import { CuotasService } from './cuotas.service';
import { CuotasController } from './cuotas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuota } from './entities/cuota.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuota])],
  controllers: [CuotasController],
  providers: [CuotasService],
})
export class CuotasModule {}
