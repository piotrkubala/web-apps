import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingHistoryComponent } from './shopping-history.component';

describe('ShoppingHistoryComponent', () => {
  let component: ShoppingHistoryComponent;
  let fixture: ComponentFixture<ShoppingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
