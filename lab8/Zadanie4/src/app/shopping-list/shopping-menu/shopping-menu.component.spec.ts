import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingMenuComponent } from './shopping-menu.component';

describe('ShoppingMenuComponent', () => {
  let component: ShoppingMenuComponent;
  let fixture: ComponentFixture<ShoppingMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
