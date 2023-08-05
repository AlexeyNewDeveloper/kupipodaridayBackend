import { IsString, Length, IsUrl, IsArray } from "class-validator"
import { User } from "src/users/entities/user.entity"
import { Wish } from "src/wishes/entities/wish.entity"

export class CreateWishlistDto {
    owner: User

    @IsString()
    @Length(1, 250)
    name: string

    @IsString()
    @Length(1500)
    description: string

    @IsUrl()
    @IsString()
    image: string

    @IsArray()
    items: Wish[]
}
