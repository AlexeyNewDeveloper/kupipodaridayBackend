import { Controller, Get, Post, UseGuards, Request, Patch, Param, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/strategies/local/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/strategies/jwt/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { WishesService } from './wishes/wishes.service';
import { FindUserDto } from './users/dto/find-users.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  async register(@Request() req) {
    return this.authService.register(req.body.registerData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/me')
  async getSelfProfile(@Request() req) {
    return this.usersService.getUserProfile({ id: req.user.id })
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/users/me')
  async updateSelfProfile(@Request() req) {
    return this.usersService.updateOne(req.user.id, req.body.payload)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/me/wishes')
  async getOwnWishes(@Request() req) {
    return this.usersService.getOwnWishes({ id: req.user.id })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/:username')
  async getPublicUserProfileByUsername(@Param() username: string) {
    return this.usersService.getPublicUserProfileByUsername(username)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/:username/wishes')
  async getPublicUserWishesByUsername(@Param() username: string) {
    return this.usersService.getPublicUserWishesByUsername({ username })
  }

  @UseGuards(JwtAuthGuard)
  @Post('/users/find')
  async findUser(@Body() reqBody: FindUserDto) {
    return this.usersService.findAll(reqBody.query)
  }

}
