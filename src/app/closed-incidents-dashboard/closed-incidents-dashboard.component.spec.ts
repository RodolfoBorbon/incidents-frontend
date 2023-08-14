import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedIncidentsDashboardComponent } from './closed-incidents-dashboard.component';

describe('ClosedIncidentsDashboardComponent', () => {
  let component: ClosedIncidentsDashboardComponent;
  let fixture: ComponentFixture<ClosedIncidentsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClosedIncidentsDashboardComponent]
    });
    fixture = TestBed.createComponent(ClosedIncidentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
