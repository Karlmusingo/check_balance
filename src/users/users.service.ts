import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseUserDto } from './dto/base-user.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface CreateUserResponse {
  username: string;
  email: string;
  token: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<CreateUserDto>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    const hash = bcrypt.hashSync(createUserDto.password, 10);

    try {
      await this.userModel.create({ ...createUserDto, password: hash });

      const token = await this.jwtService.signAsync({
        username: createUserDto.username,
        email: createUserDto.email,
      });

      return {
        username: createUserDto.username,
        email: createUserDto.email,
        token,
      };
    } catch (err) {
      throw new InternalServerErrorException(
        err.message || 'Internal server error',
      );
    }
  }

  async findOne(condition: any): Promise<BaseUserDto | null | undefined> {
    try {
      const user = await this.userModel.findOne(condition);

      return user;
    } catch (err) {
      throw new InternalServerErrorException(
        err.message || 'Internal server error',
      );
    }
  }
}
