import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanesService {

  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>
  ){}


  async create(createPlaneDto: CreatePlaneDto) {
    const nuevoPlan = await this.planRepository.create({
      nombre: createPlaneDto.nombre,
      descripcion: createPlaneDto.descripcion,
      precio: createPlaneDto.precio,
      frecuencia_pago: createPlaneDto.frecuenciaPago,
      activo: true
    })

    return this.planRepository.save(nuevoPlan);
  }

  async findAll() {
    return await this.planRepository.find({
      where: { activo: true},
      order: { id: 'ASC'}
    })
  }

  async findOne(id: number) {
    const plan = await this.planRepository.findOne({ where: { id } })
    if(!plan) throw new NotFoundException('Plan no encontrado')
    return plan;
  }

  async remove(id: number) {
    const plan = await this.findOne(id);
    return this.planRepository.remove(plan);
  }
}
