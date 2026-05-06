import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CertificadoPlantillasService } from './certificado-plantillas.service';
import { CreateCertificadoPlantillaDto } from './dto/create-certificado-plantilla.dto';
import { UpdateCertificadoPlantillaDto } from './dto/update-certificado-plantilla.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('certificado-plantillas')
@Controller('certificado-plantillas')
export class CertificadoPlantillasController {
  constructor(private readonly service: CertificadoPlantillasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear plantilla de certificado' })
  create(@Body() createDto: CreateCertificadoPlantillaDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las plantillas' })
  findAll() {
    return this.service.findAll();
  }

  @Get('curso/:cursoId')
  @ApiOperation({ summary: 'Obtener plantilla por ID de curso' })
  findByCurso(@Param('cursoId', ParseIntPipe) cursoId: number) {
    return this.service.findByCurso(cursoId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener plantilla por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar plantilla' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateCertificadoPlantillaDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar plantilla' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
