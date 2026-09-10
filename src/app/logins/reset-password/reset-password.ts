import { Component, inject } from '@angular/core';
import { Accounts } from '../../services/accounts';
import { AccountFormat } from '../register/account-format';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  accounts: AccountFormat[] = [];
  isHovered: boolean = false;
  constructor(
    private accountService: Accounts,
    private router: Router
  ) { }
  private fb = inject(FormBuilder);
  accountForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword:['',[Validators.required, Validators.minLength(8)]]
  })
  resetPassword() {
    const email = this.accountForm.value.email!;
    const newPassword = this.accountForm.value.password!;

    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return
    }

    if (this.accountForm.value.password !== this.accountForm.value.confirmPassword) {
      alert("Password does not match!");
      return
    }

    if (!this.accountService.resetPassword(email, newPassword)) {
      alert('Email does not exist!');
      return;
    }

    return alert('Password reset successfully!');
    this.accountForm.reset();
  }

  returnLogin() {
    return this.router.navigate(['/']);
  }
}
