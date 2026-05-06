import { Controller, Post, Get, Body, Req, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/recovery.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  register(@Body() createDto: RegisterDto) {
    return this.authService.register(createDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  login(@Body() loginDto: LoginDto, @Req() req: any) {
    const ip = (req.ip || req.connection?.remoteAddress || '') as string;
    const userAgent = (req.headers['user-agent'] || '') as string;
    return this.authService.login(loginDto, { ip, userAgent });
  }

  @Public()
  @Post('google')
  @ApiOperation({ summary: 'Iniciar sesión / Registro con Google' })
  googleLogin(
    @Body() body: { 
      token?: string, 
      access_token?: string,
      fingerprint?: string,
      navegador?: string,
      sistema_operativo?: string,
      nombre_dispositivo?: string
    }, 
    @Req() req: any
  ) {
    const ip = (req.ip || req.connection?.remoteAddress || '') as string;
    const userAgent = (req.headers['user-agent'] || '') as string;
    return this.authService.googleLogin(body, { ip, userAgent });
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refrescar tokens' })
  refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refreshTokens(refreshDto.userId, refreshDto.refreshToken);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cerrar sesión' })
  logout(@Req() req: any) {
    return this.authService.logout(req.user.sub);
  }

  @Public()
  @Post('forgot-password')
  @ApiOperation({ summary: 'Solicitar recuperación de contraseña' })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Public()
  @Post('reset-password')
  @ApiOperation({ summary: 'Restablecer contraseña con token' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.newPassword);
  }

  @Public()
  @Get('verify-email')
  @ApiOperation({ summary: 'Verificar correo electrónico' })
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }
}
