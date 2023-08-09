import { IsBoolean, IsNumber, Min } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";

export class CreateOfferDto {
    @IsNumber()
    itemId: number;

    @Min(1)
    @IsNumber()
    amount: number;

    @IsBoolean()
    hidden: boolean;
}
