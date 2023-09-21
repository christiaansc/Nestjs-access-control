import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { LoginAuthDto } from "./login-auth.dto";


export class RegisterAuthDto extends LoginAuthDto {
    @IsNotEmpty()

    @IsString()
    @MinLength(1)
    name: string

    @IsOptional()
    role: string
}