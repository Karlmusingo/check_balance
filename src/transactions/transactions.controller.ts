import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Query,
  Request,
  UsePipes,
} from '@nestjs/common';
import { JoiValidationPipe } from 'src/JoiValidationPipe';
import { BaseTransactionDto } from './dto/base-transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { createTransactionSchema } from './transactions.validator';

interface IRequest extends Request {
  user: {
    _id: string;
    username: string;
    email: string;
  };
}

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createTransactionSchema))
  create(
    @Req() request: IRequest,
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<CreateTransactionDto> {
    const { user } = request;

    return this.transactionsService.create({
      ...createTransactionDto,
      userId: user._id,
    });
  }

  @Get()
  getAll(
    @Req() request: IRequest,
    @Query() query,
  ): Promise<BaseTransactionDto[]> {
    const { user } = request;

    return this.transactionsService.getAll(user._id, query);
  }
}

// export class UsersController {
//   @Post('login')
//   @UsePipes(new JoiValidationPipe(loginSchema))
//   async login(@Body() loginUserDto: LoginUserDto): Promise<CreateUserResponse> {
//     const user: BaseUserDto = await this.usersService.findOne({
//       $or: [
//         { username: loginUserDto.username },
//         { email: loginUserDto.username },
//       ],
//     });

//     if (!user) {
//       throw new BadRequestException('Wrong username or password');
//     }

//     if (!bcrypt.compareSync(loginUserDto.password, user.password)) {
//       throw new BadRequestException('Wrong username or password');
//     }

//     const token = await this.jwtService.signAsync({
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//     });

//     return { username: user.username, email: user.email, token };
//   }
// }
