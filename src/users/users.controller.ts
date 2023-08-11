import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/strategies/jwt/jwt-auth.guard";
import { FindUserDto } from "./dto/find-users.dto";
import { HashService } from "src/hash/hash.service";
import { WishesService } from "src/wishes/wishes.service";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly wishesService: WishesService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async findOwn(@Request() req) {
    return this.usersService.findOne({
      where: { id: +req.user.id },
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch("me")
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    let hashedPassword: string;
    if (updateUserDto.password) {
      hashedPassword = await this.hashService.hash(updateUserDto.password);
      updateUserDto.password = hashedPassword;
    }
    return this.usersService.updateOne(+req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me/wishes")
  async getOwnWishes(@Request() req) {
    const user = await this.usersService.findOne({
      where: {
        id: +req.user.id,
      },
      relations: {
        wishes: true,
      },
      select: {
        wishes: true,
      },
    });
    return user.wishes;
  }

  @UseGuards(JwtAuthGuard)
  @Get(":username")
  async findOne(@Param() username: { username: string }) {
    return this.usersService.findOne({
      where: username,
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":username/wishes")
  async getWishes(@Param() username: { username: string }) {
    const userWishes = await this.usersService.findOne({
      where: username,
      relations: {
        wishes: true,
      },
      select: {
        wishes: true,
      },
    });
    return userWishes.wishes;
  }

  @UseGuards(JwtAuthGuard)
  @Post("find")
  async findMany(@Body() reqBody: FindUserDto) {
    return this.usersService.findAll({
      where: [{ username: reqBody.query }, { email: reqBody.query }],
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
