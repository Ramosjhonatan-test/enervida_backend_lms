import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AuditoriaLogsService } from './auditoria.service';
import { CreateAuditoriaLogDto } from './dto/create-auditoria-log.dto';
import { UpdateAuditoriaLogDto } from './dto/update-auditoria-log.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auditoria')
@Controller('auditoria')
export class AuditoriaLogsController {
  constructor(private readonly service: AuditoriaLogsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear AuditoriaLog' })
  create(@Body() createDto: CreateAuditoriaLogDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los AuditoriaLogs' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un AuditoriaLog por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un AuditoriaLog' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateAuditoriaLogDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un AuditoriaLog' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Delete('all/clear')
  @ApiOperation({ summary: 'Eliminar todos los AuditoriaLogs' })
  deleteAll() {
    return this.service.deleteAll();
  }
}
