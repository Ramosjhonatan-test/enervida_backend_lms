import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PreguntasService } from './preguntas.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('preguntas')
@Controller('preguntas')
export class PreguntasController {
  constructor(private readonly service: PreguntasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear Pregunta' })
  create(@Body() createDto: CreatePreguntaDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los Preguntas' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un Pregunta por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un Pregunta' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdatePreguntaDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Pregunta' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
