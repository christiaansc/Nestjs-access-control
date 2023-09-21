import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class UpdateUserDto {
    @IsNotEmpty()

    @IsString()
    @MinLength(1)
    name: string

    @IsOptional()
    role: string

}
