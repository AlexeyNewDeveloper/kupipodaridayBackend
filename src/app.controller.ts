import { Controller, Get, Post, UseGuards, Request, Patch, Param, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/strategies/local/local-auth.guard';
import { AuthService } from './auth/auth.service';


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
  async register(@Body() reqBody) {
    return this.authService.register(reqBody);
  }

}
