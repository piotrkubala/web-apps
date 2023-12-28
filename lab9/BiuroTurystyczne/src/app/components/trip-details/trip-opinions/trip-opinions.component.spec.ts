import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripOpinionsComponent } from './trip-opinions.component';

describe('TripOpinionsComponent', () => {
  let component: TripOpinionsComponent;
  let fixture: ComponentFixture<TripOpinionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripOpinionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripOpinionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
