import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Cuota } from 'src/cuotas/entities/cuota.entity';
import { Pago } from 'src/pagos/entities/pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Cuota, Pago])],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [TypeOrmModule]
})
export class ClientesModule {}
