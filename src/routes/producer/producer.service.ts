import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UserActiveInterface } from '../../shared/interfaces/active-user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Producer } from '../../entities/producer.entity';

@Injectable()
export class ProducerService {

  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
    private readonly entityManager: EntityManager
  ) { }

  async create(createProducerDto: CreateProducerDto, user: UserActiveInterface) {
    const newProducer = this.producerRepository.create(createProducerDto)

    console.log(createProducerDto);

    try {
      await this.producerRepository.save({ ...newProducer, createdBy: user.id, events: [] })
      return { statusCode: HttpStatus.CREATED, message: `Producer ${newProducer.name} was  created Successfully` }

    } catch (error) {
      console.log(error);

      throw new HttpException('Error creating producer', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    return await this.producerRepository.find()

  }

  findOne(id: number) {
    return `This action returns a #${id} producer`;
  }

  update(id: number) {
    return `This action updates a #${id} producer`;
  }

  remove(id: number) {
    return `This action removes a #${id} producer`;
  }
}
