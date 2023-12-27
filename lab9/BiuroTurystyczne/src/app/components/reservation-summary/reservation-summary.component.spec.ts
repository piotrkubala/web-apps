import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSummaryComponent } from './reservation-summary.component';

describe('ReservationSummaryComponent', () => {
  let component: ReservationSummaryComponent;
  let fixture: ComponentFixture<ReservationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
