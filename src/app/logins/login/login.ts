import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountFormat } from '../register/account-format';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Accounts } from '../../services/accounts';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  account: AccountFormat[] = [];
  isHovered1 = false;
  isHovered2 = false;
  constructor(
    private router: Router,
    private accountService: Accounts
  ) { }

  private fb = inject(FormBuilder)
  accountLogin = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['',[Validators.required, Validators.minLength(8)]]
  })

  createAccount() {
    return this.router.navigate(['/crateAccount'])
  }

  resetPassword() {
    return this.router.navigate(['/resetPassword'])
  }

  login() {
    const email = this.accountLogin.value.email!;
    const password = this.accountLogin.value.password!;

    if (!this.accountService.checkEmailExit(email)) {
      alert('Email does not exit');
      return
    }

    if (!this.accountService.login(email, password)){
      alert('Wrong password');
      return
    }

    alert('Login successful');
    this.accountLogin.reset();
  }
}
