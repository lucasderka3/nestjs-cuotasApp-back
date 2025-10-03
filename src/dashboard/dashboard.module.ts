import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuota } from 'src/cuotas/entities/cuota.entity';
import { Plan } from 'src/planes/entities/plan.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Pago } from 'src/pagos/entities/pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuota, Plan, Cliente, Pago])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
