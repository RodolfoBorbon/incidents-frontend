import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingSurveyComponent } from './banking-survey.component';

describe('BankingSurveyComponent', () => {
  let component: BankingSurveyComponent;
  let fixture: ComponentFixture<BankingSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankingSurveyComponent]
    });
    fixture = TestBed.createComponent(BankingSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
