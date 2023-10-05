import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventService } from './event/event.service';
import { EventController } from './event/event.controller';
import { Event } from 'src/entities/event.entity';
import { Producer } from 'src/entities/producer.entity';
import { ProducerController } from './producer/producer.controller';
import { ProducerService } from './producer/producer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Event, Producer]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '360s' },
      }),
      inject: [ConfigService]
    }),


  ],
  controllers: [UserController, AuthController, EventController, ProducerController],
  providers: [UserService, AuthService, EventService, ProducerService],
  exports: [JwtModule]
})
export class RoutesModule { }
