import { IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateProducerDto {
    @IsString()
    rut: string;

    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsString()
    region: string;

    @IsString()
    comuna: string;

    @IsEmail()
    email: string;

    @IsNumber()
    phone: number;
}
