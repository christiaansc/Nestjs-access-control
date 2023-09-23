import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/shared/emuns/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (!role) return
    const { user } = context.switchToHttp().getRequest()

    if (user.role === Role.ADMIN) return true
    return user.role === role;
  }
}
