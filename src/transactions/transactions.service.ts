import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { BaseTransactionDto } from './dto/base-transaction.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { TransactionTypes } from 'src/constants/transactionTypes';

interface ICreateTransaction extends CreateTransactionDto {
  userId: string;
}

export interface IMetaData {
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction')
    private transactionModal: Model<BaseTransactionDto>,
  ) {}

  async getLatestTransaction(userId: string): Promise<BaseTransactionDto> {
    try {
      const transaction = await this.transactionModal
        .findOne({ user: userId })
        .sort({ field: 'asc', _id: -1 })
        .limit(1);
      return transaction;
    } catch (err) {
      throw new InternalServerErrorException(
        err.message || 'Internal server error',
      );
    }
  }

  async create(
    createTransactionDto: ICreateTransaction,
  ): Promise<CreateTransactionDto> {
    try {
      const lastTransaction = await this.getLatestTransaction(
        createTransactionDto.userId,
      );

      const newBalance =
        createTransactionDto.transactionType === TransactionTypes.CREDIT
          ? (lastTransaction?.newBalance || 0) - createTransactionDto.amount
          : (lastTransaction?.newBalance || 0) + createTransactionDto.amount;

      const newTransaction = await this.transactionModal.create({
        ...createTransactionDto,
        user: createTransactionDto.userId,
        newBalance,
      });

      return newTransaction;
    } catch (err) {
      throw new InternalServerErrorException(
        err.message || 'Internal server error',
      );
    }
  }

  async getAll(
    userId: string,
    query: Record<string, number>,
  ): Promise<{ data: BaseTransactionDto[]; meta: IMetaData }> {
    try {
      const { limit = 5, page = 1 } = query;
      const transactions = await this.transactionModal
        .find({ user: userId })
        .select('-__v')
        .sort({ field: 'asc', _id: -1 })
        .skip(Number(limit) * (Number(page) - 1))
        .limit(Number(limit));

      const totalCount = await this.transactionModal.countDocuments({
        user: userId,
      });

      // const data = await this.transactionModal.aggregate([
      //   {
      //     $facet: {
      //       paginatedResult: [
      //         // { $match: { user: userId } },
      //         { $sort: { _id: -1 } },
      //         { $skip: offset },
      //         { $limit: limit },
      //       ],
      //       totalCount: [
      //         { $match: { 'user._id': userId } },
      //         { $count: 'totalCount' },
      //       ],
      //     },
      //   },
      // ]);

      // console.log('data :>> ', data[0].totalCount);
      // console.log('totalCount :>> ', totalCount);

      return {
        data: transactions,
        meta: {
          total: totalCount,
          page: Number(page),
          limit: Number(limit),
        },
      };
    } catch (err) {
      throw new InternalServerErrorException(
        err.message || 'Internal server error',
      );
    }
  }
}
