import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
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
      relations: ['pagos', 'cliente', 'plan']
    })

    if(!cuota) {
      throw new NotFoundException('Cuota no encontrada')
    }

    if(cuota.pagada){
      throw new BadRequestException('La cuota ya se encuentra como pagada. No se pueden registrar mas pagos para esta cuota.')
    }

    const pagosPrevios = cuota.pagos || [];
    const totalPagado = pagosPrevios.reduce((sum, p) => sum + p.monto,0)
    const montoRestante = cuota.monto - totalPagado;

    if(montoRestante <= 0){
      throw new BadRequestException('No hay saldo pendiente para esta cuota')
    }


    const nuevoPago = this.pagoRepository.create({
      cuota,
      cliente: cuota.cliente,
      fecha: createPagoDto.fecha ? new Date(createPagoDto.fecha) : new Date(),
      monto: montoRestante,
      metodoPago: createPagoDto.metodoPago,
      observaciones: createPagoDto.observaciones
    });

    await this.pagoRepository.save(nuevoPago);
    

    if(totalPagado + montoRestante >= cuota.monto && !cuota.pagada){
      cuota.pagada = true;
      cuota.fechaPago = new Date();
      await this.cuotaRepository.save(cuota);
    }

    return nuevoPago;

  }

  findAll() {
    return this.pagoRepository.find({ relations: ['cuota']});
  }

  async findOne(id: number) {
    const pago = await this.pagoRepository.findOne({
      where: {id},
      relations: ['cuota']
    })

    if(!pago){
      throw new NotFoundException('Pago no encontrado')
    }

    return pago;
  }


  async remove(id: number) {
    const pago = await this.pagoRepository.findOne({where: {id}});
    
    if(!pago){
      throw new NotFoundException('Pago no encontrado')
    }

    await this.pagoRepository.remove(pago);

    return { message: 'Pago eliminado correctamente'}

  }

  async findByCuota(cuotaId: number){
    const pagos = await this.pagoRepository.find({
      where: {cuota: {id: cuotaId}},
      relations: ['cuota']
    });

    return pagos;
  }

}
