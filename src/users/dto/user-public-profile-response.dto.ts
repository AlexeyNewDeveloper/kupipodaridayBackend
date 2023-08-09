import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, Length, IsUrl, IsEmail, IsNotEmpty, IsArray, IsDate, IsNumber } from 'class-validator';

export class UserPublicProfileResponseDto {

    @IsNumber()
    id: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    @IsString()
    @Length(2, 30)
    username: string;

    @IsString()
    @Length(2, 200)
    about: string;

    @IsUrl()
    @IsString()
    avatar: string;
}