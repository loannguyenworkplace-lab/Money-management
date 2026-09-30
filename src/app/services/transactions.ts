import { Injectable } from '@angular/core';
import { TransactionFormat } from '../models/transactions-format';

@Injectable({
  providedIn: 'root',
})
export class Transactions {
  private storageKey = 'transaction';
  getTransaction(): TransactionFormat[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }
  saveTransaction(transaction: TransactionFormat) {
    const transactions = this.getTransaction();
    transactions.push(transaction);
    localStorage.setItem(this.storageKey, JSON.stringify(transactions));
  }
  getFilterTransasction(month: number): TransactionFormat[] {
    return this.getTransaction().filter(transaction => {
      const date = new Date(transaction.date);
      return date.getMonth() === month;
    });
  }
  totalIncome(month: number): number {
    return this.getFilterTransasction(month).filter(transaction => transaction.type === 'income').reduce((total, transaction) => total + transaction.amount, 0);
  }

  totalExpense(month: number): number {
    return this.getFilterTransasction(month).filter(transaction => transaction.type === 'expense').reduce((total, transaction) => total + transaction.amount, 0);
  }
  totalSaving(month: number): number {
    return this.totalIncome(month) - this.totalExpense(month);
  }
  compareIncome(month: number): number {
    return this.totalIncome(month) && this.totalIncome(month - 1) > 0 ? Math.floor(((this.totalIncome(month) - this.totalIncome(month - 1)) / this.totalIncome(month - 1)) * 100) : 0;
  }
  compareExpense(month: number): number {
    return this.totalExpense(month) && this.totalExpense(month - 1) > 0 ? Math.floor(((this.totalExpense(month) - this.totalExpense(month - 1)) / this.totalExpense(month - 1)) * 100) : 0;
  }
  compareSavings(month: number): number {
    return this.totalSaving(month) && this.totalSaving(month - 1) > 0 ? Math.floor(((this.totalSaving(month) - this.totalSaving(month - 1)) / this.totalSaving(month - 1)) * 100) : 0;
  }
  getChartMonth(period: string) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    const result = [];
    if (period === "year") {
      for (let i = 0; i < 12; i++) {
        result.push({
          name: months[i],
          month: i
        });
      }
    } else {
      for (let i = 5; i >= 0; i--) {
        result.push({
          name: months[currentMonth - i],
          month: currentMonth - i
        });
      }
    };
    return result
  }
  maxHeightChart(period: string) {
    const heights = [];
    const months = this.getChartMonth(period);
    for (let i = 5; i >= 0; i--) {
      heights.push({
        month: months[i].month,
        height: this.totalExpense(months[i].month)
      });
    }
    const maxHeight = Math.max(...heights.map(h => h.height));
    return maxHeight;
  }
  firstAxis(period: string) {
    return Math.ceil((this.maxHeightChart(period) / 100 / 5) * 100);
  }
  getAxes(period: string) {
    const axis = this.firstAxis(period) / 100;
    return [Math.ceil(axis * 5), Math.ceil(axis * 4), Math.ceil(axis * 3), Math.ceil(axis * 2), Math.ceil(axis), 0];
  }
  incomeSpending(month: number) {
    return Math.round((this.totalIncome(month) / (this.totalIncome(month) + this.totalExpense(month) + this.totalSaving(month))) * 100);
  }
  expenseSpending(month: number) {
    return Math.round((this.totalExpense(month) / (this.totalIncome(month) + this.totalExpense(month) + this.totalSaving(month))) * 100);
  }
  monthInsideChart(month: number) {
    const date = new Date(2026, month, 1);
    return date.toLocaleString('en-US', { month: 'short' });
  }
  monthInsideBudget(month: number) {
     const date = new Date(2026, month, 1);
     return date.toLocaleString('en-US', { month: 'long' });
   }
  getRecentTransaction(month: number) {
    const transactions = this.getFilterTransasction(month);
    return transactions.sort((a, b) => { return new Date(b.date).getTime() - new Date(a.date).getTime(); }).slice(0, 5);
  }
  getExpenseByCategory(category:string, month: number) {
    return this.getFilterTransasction(month).filter(transaction =>transaction.type === "expense" && transaction.category === category).reduce((total, transaction) => total + transaction.amount, 0);
  }
}
