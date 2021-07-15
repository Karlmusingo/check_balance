import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { CreateUserResponse, UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JoiValidationPipe } from 'src/JoiValidationPipe';
import { createUserSchema, loginSchema } from './users.validator';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { BaseUserDto } from './dto/base-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  @UsePipes(new JoiValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @UsePipes(new JoiValidationPipe(loginSchema))
  async login(@Body() loginUserDto: LoginUserDto): Promise<CreateUserResponse> {
    const user: BaseUserDto = await this.usersService.findOne({
      $or: [
        { username: loginUserDto.username },
        { email: loginUserDto.username },
      ],
    });

    if (!user) {
      throw new BadRequestException('Wrong username or password');
    }

    if (!bcrypt.compareSync(loginUserDto.password, user.password)) {
      throw new BadRequestException('Wrong username or password');
    }

    const token = await this.jwtService.signAsync({
      _id: user._id,
      username: user.username,
      email: user.email,
    });

    return { username: user.username, email: user.email, token };
  }
}
