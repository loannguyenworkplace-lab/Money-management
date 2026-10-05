import { Routes } from '@angular/router';
import { LoginComponent } from './logins/login/login';
import { RegisterComponent } from './logins/register/register';
import { ResetPassword } from './logins/reset-password/reset-password';
import { Dashboard } from './mains/dashboard/dashboard';
import { Transactions } from './mains/transactions/transactions';
import { AddTransaction } from './mains/add-transaction/add-transaction';
import { Budget } from './mains/budget/budget';
import { Report } from './mains/report/report';
import { Setting } from './mains/setting/setting';
import { BudgetManage } from './mains/budget-manage/budget-manage';
import { ViewAllTransactions } from './mains/view-all-transactions/view-all-transactions';

export const routes: Routes = [
  {
    path: '',
    component:LoginComponent
  },
  {
    path: 'crateAccount',
    component: RegisterComponent
  },
  {
    path: 'resetPassword',
    component: ResetPassword
  },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: 'budget-manage',
        component: BudgetManage,
      },
      {
        path: 'view-all-transactions',
        component:ViewAllTransactions
      }
    ]
  },
  {
    path: 'transactions',
    component: Transactions,
    children: [
      {
        path: 'add-transactions',
        component: AddTransaction,
      },
    ]
  },
  {
    path: 'budgets',
    component: Budget,
  },
  {
    path: 'reports',
    component:Report
  },
  {
    path: 'setting',
    component:Setting
  }
];
