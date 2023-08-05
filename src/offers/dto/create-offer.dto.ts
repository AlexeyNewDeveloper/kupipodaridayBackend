import { IsBoolean, IsNumber } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";

export class CreateOfferDto {
    user: User

    item: Wish;

    @IsNumber()
    amount: number;

    @IsBoolean()
    hidden: boolean;
}
