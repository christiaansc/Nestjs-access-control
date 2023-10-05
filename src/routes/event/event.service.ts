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


    const { producerId } = createEventDto

    const eventObj = this.eventRepository.create(createEventDto)

    console.log({ createEventDto, userActive, producerId, eventObj });
    try {

      await this.eventRepository.save({ ...createEventDto, createdBy: userActive.id, producerId })
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
