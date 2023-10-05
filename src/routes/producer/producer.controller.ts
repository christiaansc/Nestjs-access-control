import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from 'src/shared/emuns/roles.enum';
import { ActiveUser } from 'src/shared/decorators/active-user.decotaror';
import { UserActiveInterface } from 'src/shared/interfaces/active-user.interface';

@Auth(Role.USER)
@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) { }

  @Post()
  async create(@Body() createProducerDto: CreateProducerDto, @ActiveUser() user: UserActiveInterface) {
    return await this.producerService.create(createProducerDto, user);
  }

  @Get()
  findAll() {
    return this.producerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.producerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.producerService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.producerService.remove(+id);
  }
}
