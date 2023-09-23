import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Auth } from './decorators/auth.decorator';
import { Role } from 'src/shared/emuns/roles.enum';
import { ActiveUser } from 'src/shared/decorators/active-user.decotaror';
import { UserActiveInterface } from 'src/shared/interfaces/active-user.interface';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }
    @Post('register')
    @Auth(Role.ADMIN)
    async register(@Body() userObject: RegisterAuthDto, @ActiveUser() userActive: UserActiveInterface) {
        return await this.authService.register(userObject, userActive)
    }

    @Post('logIn')
    async logIn(@Body() userObjectLogin: LoginAuthDto) {
        return this.authService.SignIn(userObjectLogin)
    }



    @Get('profile')
    @Auth(Role.USER)
    async profile(@ActiveUser() user: UserActiveInterface) {
        return this.authService.profile(user)
    }




}
