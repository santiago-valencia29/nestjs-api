import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  NotFoundException,
  Res,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UserDto } from '../users/user.dto';
import { UsersService } from '../users/users.service';
import { AnyExceptionFilter } from 'src/exception-filters/any-exception.filter';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt')) // esto es un ejemplo
  @Get('users')
  @UseFilters(AnyExceptionFilter)
  async getProfile(@Res() res) {
    const users = await this.userService.findAll();
    if(!users) throw new NotFoundException('Users Not Found');
    return res.status(HttpStatus.OK).json({
      users});
  }

  @Post('register')
  async register(@Body() data: UserDto) {
    const user: any  = {
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
    };
    return await this.userService.create(user);
  }
}
