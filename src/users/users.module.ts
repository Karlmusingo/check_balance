import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TransactionsService } from 'src/transactions/transactions.service';
import {
  Transaction,
  TransactionSchema,
} from 'src/transactions/schemas/transaction.schema';

@Module({
  providers: [UsersService, TransactionsService],
  controllers: [UsersController],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: { expiresIn: '2d' },
    }),
  ],
})
export class UsersModule {}
