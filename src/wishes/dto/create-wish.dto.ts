import { IsString, Length, IsUrl, IsNumber, Min, IsArray } from "class-validator";
import { Offer } from "src/offers/entities/offer.entity";
import { User } from "src/users/entities/user.entity";

export class CreateWishDto {
    @IsString()
    @Length(1, 250)
    name: string

    @IsUrl()
    @IsString()
    link: string;

    @IsUrl()
    @IsString()
    image: string;

    @IsNumber()
    @Min(1)
    price: number;

    @IsString()
    @Length(1, 1024)
    description: string

    owner?: User;
}
