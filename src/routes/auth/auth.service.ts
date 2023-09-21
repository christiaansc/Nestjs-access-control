import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt'
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async register(userObject: RegisterAuthDto) {
        const { email, password } = userObject
        const user = await this.userRepository.findOneBy({ email })
        if (user) throw new HttpException('email is already used', HttpStatus.BAD_REQUEST);
        const hashPass = await bcrypt.hash(password, 10)
        userObject = { ...userObject, password: hashPass }
        const newUser = this.userRepository.create(userObject)
        try {
            await this.userRepository.save(newUser)
            return { statusCode: HttpStatus.CREATED, message: `User ${newUser.email} created Successfully ` }

        } catch (error) {
            throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR)

        }

    }

    async SignIn(userObjectLogin: LoginAuthDto) {



        const { email, password } = userObjectLogin
        const user = await this.userService.findoneByEmailWithPassword(email)
        if (!user) throw new HttpException('User not Found', HttpStatus.NOT_FOUND)
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) throw new HttpException('Incorrect password', HttpStatus.FORBIDDEN)
        const payload = { id: user.id, username: user.name, email: user.email, role: user.role };
        const access_token = await this.jwtService.signAsync(payload)
        return { access_token }


    }

}
