export interface TransactionFormat {
  id: number,
  type: 'income' | 'expense',
  amount: number,
  name: string,
  category: string;
  date: number,
  note: string
}
