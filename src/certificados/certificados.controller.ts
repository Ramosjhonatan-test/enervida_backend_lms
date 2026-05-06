import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CertificadosService } from './certificados.service';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { User } from '../auth/decorators/user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('certificados')
@Controller('certificados')
@UseGuards(JwtAuthGuard)
export class CertificadosController {
  constructor(private readonly service: CertificadosService) {}

  @Get('me')
  @ApiOperation({ summary: 'Obtener mis certificados' })
  findMyCertificates(@User('sub') userId: number) {
    return this.service.findByUserId(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Certificado' })
  create(@Body() createDto: CreateCertificadoDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los Certificados' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un Certificado por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un Certificado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateCertificadoDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Certificado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Descargar Certificado en PDF' })
  async download(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const buffer = await this.service.generatePdf(id);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=certificado-${id}.pdf`,
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  @Public()
  @Get('preview/:plantillaId')
  @ApiOperation({ summary: 'Previsualizar Plantilla de Certificado' })
  async preview(@Param('plantillaId', ParseIntPipe) plantillaId: number, @Res() res: Response) {
    const buffer = await this.service.generatePreview(plantillaId);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=preview.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
