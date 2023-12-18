import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketItemComponent } from './basket-item.component';

describe('BasketItemComponent', () => {
  let component: BasketItemComponent;
  let fixture: ComponentFixture<BasketItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
