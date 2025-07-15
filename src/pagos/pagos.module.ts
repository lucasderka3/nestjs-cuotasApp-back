import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { CuotasService } from 'src/cuotas/cuotas.service';
import { CuotasModule } from 'src/cuotas/cuotas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pago]), CuotasModule],
  controllers: [PagosController],
  providers: [PagosService],
})
export class PagosModule {}
