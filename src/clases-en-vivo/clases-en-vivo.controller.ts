import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ClaseEnVivosService } from './clases-en-vivo.service';
import { CreateClaseEnVivoDto } from './dto/create-clase-en-vivo.dto';
import { UpdateClaseEnVivoDto } from './dto/update-clase-en-vivo.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('clases-en-vivo')
@Controller('clases-en-vivo')
export class ClaseEnVivosController {
  constructor(private readonly service: ClaseEnVivosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear ClaseEnVivo' })
  create(@Body() createDto: CreateClaseEnVivoDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los ClaseEnVivos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ClaseEnVivo por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un ClaseEnVivo' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateClaseEnVivoDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ClaseEnVivo' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
