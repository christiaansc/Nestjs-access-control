import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class LoginAuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    password: string
}