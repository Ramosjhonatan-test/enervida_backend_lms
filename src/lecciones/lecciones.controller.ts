import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { LeccionsService } from './lecciones.service';
import { CreateLeccionDto } from './dto/create-leccion.dto';
import { UpdateLeccionDto } from './dto/update-leccion.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('lecciones')
@Controller('lecciones')
export class LeccionsController {
  constructor(private readonly service: LeccionsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear Leccion' })
  create(@Body() createDto: CreateLeccionDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los Leccions' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un Leccion por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un Leccion' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateLeccionDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Leccion' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
