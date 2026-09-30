import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetManage } from './budget-manage';

describe('BudgetManage', () => {
  let component: BudgetManage;
  let fixture: ComponentFixture<BudgetManage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetManage],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetManage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
