import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReservedTripsCounterComponent } from './total-reserved-trips-counter.component';

describe('TotalReservedTripsCounterComponent', () => {
  let component: TotalReservedTripsCounterComponent;
  let fixture: ComponentFixture<TotalReservedTripsCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalReservedTripsCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalReservedTripsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
