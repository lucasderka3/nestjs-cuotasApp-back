import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';
import { Cuota } from 'src/cuotas/entities/cuota.entity';

@Injectable()
export class PagosService {

  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,

    @InjectRepository(Cuota)
    private readonly cuotaRepository: Repository<Cuota>
  ){}

  async create(createPagoDto: CreatePagoDto) {
    
    const cuota = await this.cuotaRepository.findOne({
      where: {id: createPagoDto.cuotaId},
      relations: ['pagos']
    })

    if(!cuota) {
      throw new NotFoundException('Cuota no encontrada')
    }

    const nuevoPago = this.pagoRepository.create({
      cuota,
      fecha: createPagoDto.fecha ? new Date(createPagoDto.fecha) : new Date(),
      monto: createPagoDto.monto,
      metodoPago: createPagoDto.metodoPago,
      observaciones: createPagoDto.observaciones
    });

    await this.pagoRepository.save(nuevoPago);

    const totalPagado = cuota.pagos.reduce((sum, p) => sum + p.monto, 0) + createPagoDto.monto;

    if(totalPagado >= cuota.monto && !cuota.pagada){
      cuota.pagada = true;
      cuota.fechaPago = new Date;
      await this.cuotaRepository.save(cuota);
    }

    return nuevoPago;

  }

  findAll() {
    return `This action returns all pagos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pago`;
  }

  update(id: number, updatePagoDto: UpdatePagoDto) {
    return `This action updates a #${id} pago`;
  }

  remove(id: number) {
    return `This action removes a #${id} pago`;
  }
}
