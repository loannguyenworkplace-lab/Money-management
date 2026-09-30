import { Component, EventEmitter, Output, Input, output } from '@angular/core';
import { Transactions } from '../../services/transactions';
@Component({
  selector: 'app-view-all-transactions',
  imports: [],
  templateUrl: './view-all-transactions.html',
  styleUrl: './view-all-transactions.css',
})
export class ViewAllTransactions {
  constructor(
    public transactionService : Transactions
  ) { }
  @Output() closeViewAll = new EventEmitter<void>();
  @Input() selectedMonth!: number;
  closeAllView() {
    return this.closeViewAll.emit();
  }
}
