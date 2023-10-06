import { IsString, IsNotEmpty, IsOptional, IsDateString, IsUUID } from 'class-validator';
import { Column } from 'typeorm';
export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    eventName: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    imagePath: string;

    @Column({ type: 'date' })
    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @Column({ type: 'date' })
    @IsDateString()
    @IsNotEmpty()
    endDate: Date;

    @IsString()
    @IsNotEmpty()
    startTime: string;

    @IsString()
    @IsNotEmpty()
    endTime: string;

    @IsUUID()
    @IsNotEmpty()
    producer_uuid: string


}
