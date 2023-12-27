import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripReserverComponent } from './trip-reserver.component';

describe('TripReserverComponent', () => {
  let component: TripReserverComponent;
  let fixture: ComponentFixture<TripReserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripReserverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripReserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
