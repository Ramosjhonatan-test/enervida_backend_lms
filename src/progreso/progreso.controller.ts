import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { ProgresoLeccionsService } from './progreso.service';
import { CreateProgresoLeccionDto } from './dto/create-progreso-leccion.dto';
import { UpdateProgresoLeccionDto } from './dto/update-progreso-leccion.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('progreso')
@Controller('progreso')
export class ProgresoLeccionsController {
  constructor(private readonly service: ProgresoLeccionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear ProgresoLeccion' })
  create(@User('sub') userId: number, @Body() createDto: CreateProgresoLeccionDto) {
    // Aseguramos que el progreso sea para el usuario autenticado
    createDto.usuario_id = userId;
    return this.service.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar mis progresos de lección' })
  findAll(@User('sub') userId: number) {
    return this.service.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ProgresoLeccion por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un ProgresoLeccion' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateProgresoLeccionDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ProgresoLeccion' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
