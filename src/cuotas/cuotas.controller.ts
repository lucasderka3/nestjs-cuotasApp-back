import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuotasService } from './cuotas.service';
import { CreateCuotaDto } from './dto/create-cuota.dto';


@Controller('cuotas')
export class CuotasController {
  constructor(private readonly cuotasService: CuotasService) {}

  @Post()
  create(@Body() createCuotaDto: CreateCuotaDto) {
    return this.cuotasService.create(createCuotaDto);
  }

  @Get()
  findAll() {
    return this.cuotasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cuotasService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cuotasService.remove(id);
  }
}
