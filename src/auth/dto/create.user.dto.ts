import { IsArray, IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserdto{
    @IsString() 
    nama: string

    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    nim?: string

    @IsOptional()
    @IsString()
    nip?: string

    @IsString()
    password: string
}
