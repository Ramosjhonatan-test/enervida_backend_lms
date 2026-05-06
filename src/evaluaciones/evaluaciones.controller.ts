import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EvaluacionsService } from './evaluaciones.service';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('evaluaciones')
@Controller('evaluaciones')
export class EvaluacionsController {
  constructor(private readonly service: EvaluacionsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear Evaluacion' })
  create(@Body() createDto: CreateEvaluacionDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los Evaluacions' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un Evaluacion por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un Evaluacion' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateEvaluacionDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Evaluacion' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
