import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { NotificacionsService } from './notificaciones.service';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('notificaciones')
@Controller('notificaciones')
export class NotificacionsController {
  constructor(private readonly service: NotificacionsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear Notificacion' })
  create(@Body() createDto: CreateNotificacionDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los Notificacions' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un Notificacion por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un Notificacion' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateNotificacionDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Notificacion' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
