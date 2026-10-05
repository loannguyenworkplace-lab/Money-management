import { Injectable } from '@angular/core';
import { BudgetFormat } from '../models/budgets-format';
@Injectable({
  providedIn: 'root',
})
export class Budgets {

  private storageKeyBudget = 'budget';
  getBudget(): BudgetFormat[] {
    const data = localStorage.getItem(this.storageKeyBudget);
    return data ? JSON.parse(data) : [];
  }
  saveBudget(budget: BudgetFormat) {
    const budgets = this.getBudget();
    budgets.push(budget);
    localStorage.setItem(this.storageKeyBudget, JSON.stringify(budgets));
  }
  getFilterMonth(month:number) {
    return this.getBudget().filter(budget => {
      const date = new Date(budget.date);
      return date.getMonth() === month;
    });
  }
  getBudgetByCategory(month: number) {
    const budgets = this.getFilterMonth(month);
    const categories = [...new Set(budgets.map(budget => budget.category))];
    return categories.map(category => {
      const total = budgets.filter(budget => budget.category === category).reduce((sum, budget) => sum + budget.amount, 0);
      return {
        category: category,
        amount: total
      }
    })
  }
}
