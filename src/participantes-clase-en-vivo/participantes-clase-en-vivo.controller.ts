import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ParticipanteClaseEnVivosService } from './participantes-clase-en-vivo.service';
import { CreateParticipanteClaseEnVivoDto } from './dto/create-participante-clase-en-vivo.dto';
import { UpdateParticipanteClaseEnVivoDto } from './dto/update-participante-clase-en-vivo.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('participantes-clase-en-vivo')
@Controller('participantes-clase-en-vivo')
export class ParticipanteClaseEnVivosController {
  constructor(private readonly service: ParticipanteClaseEnVivosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear ParticipanteClaseEnVivo' })
  create(@Body() createDto: CreateParticipanteClaseEnVivoDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los ParticipanteClaseEnVivos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ParticipanteClaseEnVivo por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un ParticipanteClaseEnVivo' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateParticipanteClaseEnVivoDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ParticipanteClaseEnVivo' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
