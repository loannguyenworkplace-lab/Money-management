import { Component, inject } from '@angular/core';
import { AccountFormat } from './account-format';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { Accounts } from '../../services/accounts';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  account: AccountFormat[] = [];
  isSuccessed: boolean = false;
  isHovered: boolean = false;
  constructor(
    private router: Router,
    private accountService  : Accounts
  ){}
  private fb = inject(FormBuilder);

  accountForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword:['',Validators.required]
  })

  createAccount() {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }

    if (this.accountForm.value.password !== this.accountForm.value.confirmPassword) {
      alert('Password does not match!')
      return;
    }

    if (this.accountService.checkEmailExit(this.accountForm.value.email!)){
      alert("Email exited");
      return
    }

    const newAccount:AccountFormat = {
      id: this.account.length + 1,
      username: this.accountForm.value.username!,
      email: this.accountForm.value.email!,
      password: this.accountForm.value.password!
    }

    this.accountService.createAccount(newAccount);
    this.account = this.accountService.getAccount();

    this.isSuccessed = true;
    console.log(this.account);
    alert('Successful')
    this.accountForm.reset();
  }

  returnLogin() {
    return this.router.navigate(['/']);
  }

}
