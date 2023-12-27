import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripEvaluatorComponent } from './trip-evaluator.component';

describe('TripEvaluatorComponent', () => {
  let component: TripEvaluatorComponent;
  let fixture: ComponentFixture<TripEvaluatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripEvaluatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripEvaluatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
