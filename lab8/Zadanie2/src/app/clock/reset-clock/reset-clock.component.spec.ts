import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetClockComponent } from './reset-clock.component';

describe('ResetClockComponent', () => {
  let component: ResetClockComponent;
  let fixture: ComponentFixture<ResetClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetClockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
