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

}
