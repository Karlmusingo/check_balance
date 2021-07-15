import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TransactionTypes } from 'src/constants/transactionTypes';
import { User } from 'src/users/schemas/user.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true })
  amount: number;

  @Prop({
    required: true,
    enum: [TransactionTypes.CREDIT, TransactionTypes.DEBIT],
  })
  transactionType: TransactionTypes;

  @Prop({ required: false, default: '' })
  description: string;

  @Prop({ required: true })
  newBalance: number;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
