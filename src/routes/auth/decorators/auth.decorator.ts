import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "src/shared/emuns/roles.enum";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";
import { Roles } from "./roles.decorator";



// esta funcion aplica varios decoradores
export function Auth(role: Role) {
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard, RolesGuard)
    )
}