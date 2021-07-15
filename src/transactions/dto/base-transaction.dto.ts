import { TransactionTypes } from 'src/constants/transactionTypes';

export class BaseTransactionDto {
  _id: string;
  amount: number;
  transactionType: TransactionTypes;
  description?: string;
  newBalance: number;
  user: string;
}
