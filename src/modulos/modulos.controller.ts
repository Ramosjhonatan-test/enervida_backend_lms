import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('modulos')
@Controller('modulos')
export class ModulosController {
  constructor(private readonly service: ModulosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear Modulo' })
  create(@Body() createDto: CreateModuloDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los Modulos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un Modulo por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un Modulo' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateModuloDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Modulo' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
