import { TransactionTypes } from 'src/constants/transactionTypes';

export class CreateTransactionDto {
  amount: number;
  transactionType: TransactionTypes;
  description?: string;
}
