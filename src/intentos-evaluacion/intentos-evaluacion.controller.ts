import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { IntentoEvaluacionsService } from './intentos-evaluacion.service';
import { CreateIntentoEvaluacionDto } from './dto/create-intento-evaluacion.dto';
import { UpdateIntentoEvaluacionDto } from './dto/update-intento-evaluacion.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('intentos-evaluacion')
@Controller('intentos-evaluacion')
export class IntentoEvaluacionsController {
  constructor(private readonly service: IntentoEvaluacionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear IntentoEvaluacion' })
  create(@Body() createDto: CreateIntentoEvaluacionDto, @User('sub') userId: number) {
    if (userId) {
      createDto.usuario_id = Number(userId);
    }
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los IntentoEvaluacions' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un IntentoEvaluacion por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un IntentoEvaluacion' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateIntentoEvaluacionDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un IntentoEvaluacion' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
