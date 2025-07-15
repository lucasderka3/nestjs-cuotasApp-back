import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  create(@Body() createPagoDto: CreatePagoDto) {
    return this.pagosService.create(createPagoDto);
  }

  @Get()
  findAll() {
    return this.pagosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pagosService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pagosService.remove(id);
  }

  @Get('/cuota/:cuotaId')
  findByCuota(@Param('cuotaId') cuotaId: string){
    return this.pagosService.findByCuota(+cuotaId)
  }
}
