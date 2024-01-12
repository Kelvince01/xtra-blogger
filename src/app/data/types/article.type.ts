import { BaseType } from './base.type';

export type Article = BaseType & {
  title: string;
  description: string;
};

export interface FrequentPayments {
  logo: string;
  amount: string;
  title: string;
}

export interface Recipient {
  recipient_phone_number: number | null;
  amount: number | null;
  recipient_name: string;
  time: number;
}

export interface Transaction {
  name: string;
  reason: string;
  amount: string;
  transactionType: string;
  time: string;
}
