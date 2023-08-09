import { PartialType } from '@nestjs/mapped-types';
import { CreateWishlistDto } from './create-wishlist.dto';
import { IsString, Length, IsUrl, IsArray } from 'class-validator';

export class UpdateWishlistDto {
    @IsString()
    @Length(1, 250)
    name: string

    @IsUrl()
    @IsString()
    image: string

    @IsArray()
    itemsId: number[]
}
