import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductgSurveyComponent } from './product-survey.component';

describe('ProductgSurveyComponent', () => {
  let component: ProductgSurveyComponent;
  let fixture: ComponentFixture<ProductgSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductgSurveyComponent]
    });
    fixture = TestBed.createComponent(ProductgSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
