import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionComponent } from './opinion.component';

describe('OpinionComponent', () => {
  let component: OpinionComponent;
  let fixture: ComponentFixture<OpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpinionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
