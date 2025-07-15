import { Injectable } from '@nestjs/common';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';

@Injectable()
export class PlanesService {
  create(createPlaneDto: CreatePlaneDto) {
    return 'This action adds a new plane';
  }

  findAll() {
    return `This action returns all planes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plane`;
  }

  update(id: number, updatePlaneDto: UpdatePlaneDto) {
    return `This action updates a #${id} plane`;
  }

  remove(id: number) {
    return `This action removes a #${id} plane`;
  }
}
