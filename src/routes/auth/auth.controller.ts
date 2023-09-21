import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() userObject: RegisterAuthDto) {
        return await this.authService.register(userObject)
    }

    @Post('logIn')
    async logIn(@Body() userObjectLogin: LoginAuthDto) {
        return this.authService.SignIn(userObjectLogin)
    }

}
