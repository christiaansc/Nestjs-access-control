import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { User } from '../../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }


  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findoneByEmailWithPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'role', 'password']
    })
    if (!user) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    return user
  }

  async delete(id: string) {

    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)


    try {
      await this.userRepository.softDelete(id)
      return { statusCode: HttpStatus.NO_CONTENT, message: `User ${id} has been deleted` }

    } catch (error) {
      throw new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, userObject: UpdateUserDto) {

    const user = await this.userRepository.findOneBy({ id })

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    try {
      await this.userRepository.save({
        ...user,
        ...userObject
      })

      return { statusCode: HttpStatus.CREATED, message: `User ${id} has been Updated` }

    } catch (error) {
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
