import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyMenuComponent } from './currency-menu.component';

describe('CurrencyMenuComponent', () => {
  let component: CurrencyMenuComponent;
  let fixture: ComponentFixture<CurrencyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrencyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
