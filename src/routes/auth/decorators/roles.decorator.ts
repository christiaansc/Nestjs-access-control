import { SetMetadata } from '@nestjs/common'
import { Role } from 'src/shared/emuns/roles.enum'


export const ROLES_KEY = 'roles'

// setMetadata asignacion de metadatos personalizados a los controladores 
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role)