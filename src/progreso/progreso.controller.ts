import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProgresoLeccionsService } from './progreso.service';
import { CreateProgresoLeccionDto } from './dto/create-progreso-leccion.dto';
import { UpdateProgresoLeccionDto } from './dto/update-progreso-leccion.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('progreso')
@Controller('progreso')
export class ProgresoLeccionsController {
  constructor(private readonly service: ProgresoLeccionsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear ProgresoLeccion' })
  create(@Body() createDto: CreateProgresoLeccionDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los ProgresoLeccions' })
  findAll() {
    return this.service.findAll();
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
