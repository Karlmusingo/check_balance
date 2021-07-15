import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TransactionsModule,
    MongooseModule.forRoot(process.env.DB_URL_STRING, { useCreateIndex: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
