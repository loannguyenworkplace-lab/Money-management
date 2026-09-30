import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar';
import { Router } from '@angular/router';
import { TransactionFormat } from '../../models/transactions-format';
import { AddTransaction } from '../add-transaction/add-transaction';
@Component({
  selector: 'app-transactions',
  imports: [NavbarComponent,AddTransaction],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  constructor(
    private router: Router,
  ) { }
  transactions: TransactionFormat[]=[];
  showModal = false;
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal= false;
  }
  addTransaction(transaction:TransactionFormat) {
    this.transactions.push(transaction);
  }
}
