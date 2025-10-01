import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { PlanesModule } from './planes/planes.module';
import { CuotasModule } from './cuotas/cuotas.module';
import { PagosModule } from './pagos/pagos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


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
      synchronize: false,
    }),
    ClientesModule, PlanesModule, CuotasModule, PagosModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
