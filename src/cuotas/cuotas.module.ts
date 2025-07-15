import { Module } from '@nestjs/common';
import { CuotasService } from './cuotas.service';
import { CuotasController } from './cuotas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuota } from './entities/cuota.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Plan } from 'src/planes/entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuota, Cliente, Plan])],
  controllers: [CuotasController],
  providers: [CuotasService],
  exports: [TypeOrmModule]
})
export class CuotasModule {}
