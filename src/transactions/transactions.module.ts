import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsService } from './transactions.service';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { AuthMiddleware } from 'src/auth.middleware';
import { TransactionsController } from './transactions.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: { expiresIn: '2h' },
    }),
  ],
})
export class TransactionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(TransactionsController);
  }
}
