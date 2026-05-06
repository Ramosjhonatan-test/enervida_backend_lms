import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DispositivoUsuariosService } from './dispositivos-usuario.service';
import { CreateDispositivoUsuarioDto } from './dto/create-dispositivo-usuario.dto';
import { UpdateDispositivoUsuarioDto } from './dto/update-dispositivo-usuario.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('dispositivos-usuario')
@Controller('dispositivos-usuario')
export class DispositivoUsuariosController {
  constructor(private readonly service: DispositivoUsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear DispositivoUsuario' })
  create(@Body() createDto: CreateDispositivoUsuarioDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los DispositivoUsuarios' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un DispositivoUsuario por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un DispositivoUsuario' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateDispositivoUsuarioDto) {
    return this.service.update(id, updateDto);
  }

  @Patch('liberate/:userId')
  @ApiOperation({ summary: 'Liberar todos los dispositivos de un usuario' })
  liberate(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.deactivateAllForUser(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un DispositivoUsuario' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
