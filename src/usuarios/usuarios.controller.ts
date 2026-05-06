import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar perfil del usuario autenticado' })
  updateProfile(@User('sub') userId: any, @Body() updateDto: UpdateUsuarioDto) {
    // Solo permitimos ciertos campos para el perfil propio
    const { rol_id, estado, correo_verificado, ...safeDto } = updateDto as any;
    return this.service.update(Number(userId), safeDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
  getProfile(@User('sub') userId: any) {
    return this.service.findOne(Number(userId));
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Crear Usuario' })
  create(@Body() createDto: CreateUsuarioDto) {
    return this.service.create(createDto);
  }

  @Get('rol/:nombre')
  @Roles('admin')
  @ApiOperation({ summary: 'Listar usuarios por nombre de rol' })
  findByRole(@Param('nombre') nombre: string) {
    return this.service.findByRole(nombre);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Listar todos los Usuarios' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Obtener un Usuario por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar un Usuario' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateUsuarioDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar un Usuario' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
