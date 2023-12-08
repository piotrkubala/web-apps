import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseClockComponent } from './pause-clock.component';

describe('PauseClockComponent', () => {
  let component: PauseClockComponent;
  let fixture: ComponentFixture<PauseClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PauseClockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PauseClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
