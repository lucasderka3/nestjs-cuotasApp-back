import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { PlanesModule } from './planes/planes.module';
import { CuotasModule } from './cuotas/cuotas.module';
import { PagosModule } from './pagos/pagos.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "user_crud",
      password: "root",
      database: "db_cuotasApp",
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClientesModule, PlanesModule, CuotasModule, PagosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
