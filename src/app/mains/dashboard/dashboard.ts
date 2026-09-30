import { Component, EventEmitter, Output} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar';
import { Transactions } from '../../services/transactions';
import { TransactionFormat } from '../../models/transactions-format';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { BudgetManage } from '../budget-manage/budget-manage';
import { BudgetFormat } from '../../models/budgets-format';
import { Budgets } from '../../services/budgets';
import { ViewAllTransactions } from '../view-all-transactions/view-all-transactions';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, FormsModule, CommonModule, DatePipe, BudgetManage, ViewAllTransactions],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  selectedMonth = new Date().getMonth();
  chartPeriod = "last";
  constructor(
    public transactionService: Transactions,
    public budgetService: Budgets,
  ) { }
  showModal = false;
  budgets: BudgetFormat[] = [];
  openModal() {
    return this.showModal = true;
  }
  closeModal() {
    return this.showModal = false;
  }
  addBudget(budget:BudgetFormat) {
    this.budgets.push(budget);
  }
  showViewAll = false;
  openViewAll() {
    return this.showViewAll = true;
  }
  closeViewAll() {
    return this.showViewAll = false;
  }
}
