import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InscripcionsService } from './inscripciones.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';

@ApiTags('inscripciones')
@Controller('inscripciones')
export class InscripcionsController {
  constructor(private readonly service: InscripcionsService) {}

  @Get('me')
  @ApiOperation({ summary: 'Listar mis inscripciones' })
  findMyInscripciones(@User('sub') userId: number) {
    return this.service.findByUser(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear Inscripcion' })
  create(@User('sub') userId: number, @Body() createDto: CreateInscripcionDto) {
    return this.service.create(userId, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los Inscripcions' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un Inscripcion por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un Inscripcion' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateInscripcionDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Inscripcion' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
