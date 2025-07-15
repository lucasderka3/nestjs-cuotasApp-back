import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuota } from './entities/cuota.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Plan } from 'src/planes/entities/plan.entity';

@Injectable()
export class CuotasService {

  constructor(
    @InjectRepository(Cuota)
    private readonly cuotaRepository: Repository<Cuota>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>
  ){}

  async create(createCuotaDto: CreateCuotaDto) {
    const cliente = await this.clienteRepository.findOneBy({ id: createCuotaDto.clienteId })
    if(!cliente) throw new NotFoundException('Cliente no encontrado');

    const plan = await this.planRepository.findOneBy({ id: createCuotaDto.planId})
    if(!plan) throw new NotFoundException('Plan no encontrado')

    const nuevaCuota = this.cuotaRepository.create({
      cliente,
      plan,
      fechaInicio: new Date(createCuotaDto.fechaInicio),
      fechaFin: new Date(createCuotaDto.fechaFin),
      monto: createCuotaDto.monto,
      pagada: false,
      observaciones: createCuotaDto.observaciones,
    })

    return this.cuotaRepository.save(nuevaCuota);

  }

  async findAll() {
    return this.cuotaRepository.find({
      relations: ['cliente', 'plan', 'pagos'],
      order: {fechaInicio: 'DESC'}
    })
  }

  async findOne(id: number) {
    const cuota = await this.cuotaRepository.findOne({
      where: { id },
      relations: ['cliente', 'plan', 'pagos']
    })

    if(!cuota)throw new NotFoundException('Cuota no encontrada')

    return cuota;
  }

  async remove(id: number) {
    const cuota = await this.findOne(id);
    return this.cuotaRepository.remove(cuota);
  }
}
