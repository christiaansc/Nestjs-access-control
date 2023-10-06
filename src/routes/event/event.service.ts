import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../entities/event.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/shared/interfaces/active-user.interface';

@Injectable()


export class EventService {

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ) { }

  async create(createEventDto: CreateEventDto, userActive: UserActiveInterface) {
    const eventObj = this.eventRepository.create(createEventDto)

    try {

      await this.eventRepository.save({ ...eventObj, createdBy: userActive.id })
      return { statusCode: HttpStatus.CREATED, message: `User ${createEventDto.name} created Successfully` }

    } catch (error) {
      console.log(error);
      throw new HttpException(`error to create event`, HttpStatus.INTERNAL_SERVER_ERROR)

    }


  }

  async findAll() {
    return await this.eventRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  // update(id: number, updateEventDto: UpdateEventDto) {
  //   return `This action updates a #${id} event`;
  // }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
