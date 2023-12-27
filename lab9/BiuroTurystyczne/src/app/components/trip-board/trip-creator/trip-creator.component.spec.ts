import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCreatorComponent } from './trip-creator.component';

describe('TripCreatorComponent', () => {
  let component: TripCreatorComponent;
  let fixture: ComponentFixture<TripCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
