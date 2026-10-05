import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllTransactions } from './view-all-transactions';

describe('ViewAllTransactions', () => {
  let component: ViewAllTransactions;
  let fixture: ComponentFixture<ViewAllTransactions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllTransactions],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAllTransactions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
