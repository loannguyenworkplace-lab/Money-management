import { Component, EventEmitter, Output, inject } from '@angular/core';
import { BudgetFormat } from '../../models/budgets-format';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Budgets } from '../../services/budgets';
@Component({
  selector: 'app-budget-manage',
  imports: [ReactiveFormsModule],
  templateUrl: './budget-manage.html',
  styleUrl: './budget-manage.css',
})
export class BudgetManage {
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<BudgetFormat>();
  private fb = inject(FormBuilder);
  constructor(
    private budgetService:Budgets
  ) { }
  budgetForm = this.fb.group({
    amount: [0, Validators.required],
    category: ['', Validators.required],
    date: ['', Validators.required]
  });
  addBudget() {
    const budget: BudgetFormat = {
      amount: this.budgetForm.value.amount ?? 0,
      category: this.budgetForm.value.category ?? '',
      date: new Date(this.budgetForm.value.date!).getTime(),
    }
    if (this.budgetForm.invalid) return;
    console.log("budget",budget)
    this.add.emit(budget);
    this.budgetService.saveBudget(budget);
    this.close.emit();
  }
}
