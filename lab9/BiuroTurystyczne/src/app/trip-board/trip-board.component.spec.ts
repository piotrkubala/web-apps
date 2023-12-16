import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripBoardComponent } from './trip-board.component';

describe('TripBoardComponent', () => {
  let component: TripBoardComponent;
  let fixture: ComponentFixture<TripBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
