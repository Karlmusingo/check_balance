import Joi = require('joi');
import { TransactionTypes } from 'src/constants/transactionTypes';

export const createTransactionSchema = Joi.object({
  amount: Joi.number().required().min(0),
  transactionType: Joi.string()
    .valid(TransactionTypes.CREDIT, TransactionTypes.DEBIT)
    .required(),
  description: Joi.string(),
});
