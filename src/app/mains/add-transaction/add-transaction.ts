import { Component, EventEmitter, Output, inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionFormat } from '../../models/transactions-format';
import { Transactions } from '../../services/transactions';

@Component({
  selector: 'app-add-transaction',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-transaction.html',
  styleUrl: './add-transaction.css',
})
export class AddTransaction {
  transaction: TransactionFormat[]=[]
  constructor(
    private route: Router,
    private transactionService: Transactions,
  ) { }
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<TransactionFormat>();
  private fb = inject(FormBuilder);
  transactionForm = this.fb.group({
    type: ['expense', Validators.required],
    name: ['', [Validators.required, Validators.minLength(2)]],
    amount: [0, Validators.required],
    category: ['', Validators.required],
    date: ['', Validators.required],
    note: ['', [Validators.required, Validators.maxLength(250)]]
  });

  addTransaction() {
    const transaction: TransactionFormat = {
      id: Date.now(),
      type: this.transactionForm.value.type as  'income' | 'expense',
      name: this.transactionForm.value.name ?? '',
      amount: Number(this.transactionForm.value.amount ?? 0),
      category: this.transactionForm.value.category ?? '',
      date: new Date(this.transactionForm.value.date!).getTime(),
      note:this.transactionForm.value.note ??''
    }
    if (this.transactionForm.invalid) return;
    this.add.emit(transaction);
    this.transactionService.saveTransaction(transaction);
    this.close.emit();
  }
}
