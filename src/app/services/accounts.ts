import { Injectable } from '@angular/core';
import { AccountFormat } from '../logins/register/account-format';

@Injectable({
  providedIn: 'root',
})
export class Accounts {
  private storageKey = 'accounts';
  getAccount():AccountFormat[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  createAccount(account: AccountFormat) {
    const accounts = this.getAccount();
    accounts.push(account);
    localStorage.setItem(this.storageKey, JSON.stringify(accounts));
  }

  checkEmailExit(email:string):boolean {
    const accounts = this.getAccount();
    return accounts.some(account =>
      account.email.toLowerCase() === email.toLowerCase()
    );
  }

  resetPassword(email: string, newPassword: string): boolean{
    const accounts = this.getAccount();
    const account = accounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());

    if (!account) {
      return false;
    }

    account.password = newPassword;
    localStorage.setItem(this.storageKey, JSON.stringify(accounts));
    return true;
  }

  login(email: string, password: string): boolean {
    const accounts = this.getAccount();
    const account = accounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());
    if (!account) {
      return false;
    }
    return account.password === password;
  }
}
