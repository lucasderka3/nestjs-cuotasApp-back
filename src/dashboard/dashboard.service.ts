import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Pago } from 'src/pagos/entities/pago.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Cuota } from 'src/cuotas/entities/cuota.entity';
import { Plan } from 'src/planes/entities/plan.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(Cuota)
    private readonly cuotaRepository: Repository<Cuota>,

    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>
  ){}

  async getEstadisticas(){
    const totalGanadoMes = await this.pagoRepository
      .createQueryBuilder("pago")
      .select("SUM(pago.monto)", "total")
      .where("MONTH(pago.fecha) = MONTH(CURRENT_DATE())")
      .andWhere("YEAR(pago.fecha) = YEAR(CURRENT_DATE())")
      .getRawOne();
    
    const cantidadClientes = await this.clienteRepository.count();

    const planesMasUsados = await this.cuotaRepository
      .createQueryBuilder("cuota")
      .leftJoin("cuota.plan", "plan")
      .select("plan.nombre", "plan")
      .addSelect("COUNT(cuota.id)", "usos")
      .groupBy("plan.nombre")
      .orderBy("usos", "DESC")
      .getRawMany();

      return{
        totalGanadoMes: totalGanadoMes.total || 0,
        cantidadClientes,
        planesMasUsados
      };
  }

  async getCuotasPorVencer(dias: number){
    const hoy = new Date();
    const fechaLimite = new Date();
    fechaLimite.setDate(hoy.getDate() + dias);

    const cuotas = await this.cuotaRepository.find({
      where: {
        fechaFin: Between(hoy, fechaLimite)
      },
      relations: ['cliente', 'plan'],
      order: { fechaFin: 'ASC' }
    });

    return cuotas;
  }

}
