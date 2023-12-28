import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCarouselComponent } from './trip-carousel.component';

describe('TripCarouselComponent', () => {
  let component: TripCarouselComponent;
  let fixture: ComponentFixture<TripCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
