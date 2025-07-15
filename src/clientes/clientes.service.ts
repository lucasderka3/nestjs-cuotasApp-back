import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ){}

  async create(createClienteDto: CreateClienteDto) {
    const nuevoCliente = await this.clienteRepository.create(createClienteDto)
    return this.clienteRepository.save(nuevoCliente);
  }

  async findAll() {
    return await this.clienteRepository.find({
      order: { apellido: 'ASC'}
    })
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOne({
      where: { id }
    });

    if(!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.findOne(id);
    Object.assign(cliente, updateClienteDto);
    return this.clienteRepository.save(cliente);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    return this.clienteRepository.remove(cliente);
  }
}
