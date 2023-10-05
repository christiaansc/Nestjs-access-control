import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from 'src/shared/emuns/roles.enum';
import { ActiveUser } from 'src/shared/decorators/active-user.decotaror';
import { UserActiveInterface } from 'src/shared/interfaces/active-user.interface';


@Auth(Role.USER)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  async create(@Body() createEventDto: CreateEventDto, @ActiveUser() user: UserActiveInterface) {
    return await this.eventService.create(createEventDto, user);
  }

  @Get()
  async findAll() {
    return await this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
  //   return this.eventService.update(+id, updateEventDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
