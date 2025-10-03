import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('estadisticas')
  getEstadisticas(){
    return this.dashboardService.getEstadisticas();
  }

  @Get('cuotas-por-vencer/:dias')
  getCuotasPorVencer(@Param('dias') dias: number){
    return this.dashboardService.getCuotasPorVencer(dias);
  }
}
