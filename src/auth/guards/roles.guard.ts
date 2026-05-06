import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    
    // Asumimos que el usuario tiene una relación 'rol' cargada en el JWT o recuperada
    // En nuestro caso, el JWT payload suele tener el rol o lo inyectamos en el Request
    const userRole = user?.rol; // Ahora es directamente el nombre del rol string
    
    return requiredRoles.some((role) => userRole?.toLowerCase() === role.toLowerCase());
  }
}
