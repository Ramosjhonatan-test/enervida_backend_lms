import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/recovery.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createDto: RegisterDto): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    login(loginDto: LoginDto, req: any): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    googleLogin(body: {
        token?: string;
        access_token?: string;
        fingerprint?: string;
        navegador?: string;
        sistema_operativo?: string;
        nombre_dispositivo?: string;
    }, req: any): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    refresh(refreshDto: RefreshDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(req: any): Promise<void>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
        debug_info: string;
    } | {
        message: string;
        debug_info?: undefined;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
}
