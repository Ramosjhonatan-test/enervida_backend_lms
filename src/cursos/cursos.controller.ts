import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('cursos')
@Controller('cursos')
export class CursosController {
  constructor(private readonly service: CursosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear Curso' })
  create(@Body() createDto: CreateCursoDto) {
    return this.service.create(createDto);
  }

  @Public()
  @Get('public')
  @ApiOperation({ summary: 'Listar cursos publicados' })
  findPublished() {
    return this.service.findPublished();
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar todos los Cursos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un Curso por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un Curso' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateCursoDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Curso' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
