import { Controller, Delete, Get, Param, Patch, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id)
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() userObject: UpdateUserDto) {
    return this.userService.update(id, userObject)
  }

}
