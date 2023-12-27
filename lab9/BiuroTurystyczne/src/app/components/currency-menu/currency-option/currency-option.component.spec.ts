import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyOptionComponent } from './currency-option.component';

describe('CurrencyOptionComponent', () => {
  let component: CurrencyOptionComponent;
  let fixture: ComponentFixture<CurrencyOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrencyOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
