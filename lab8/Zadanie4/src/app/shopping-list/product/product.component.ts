import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { ShoppingItem } from '../shopping-list.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() shoppingItem!: ShoppingItem;
  @Output() removeProduct: EventEmitter<number> = new EventEmitter<number>();

  colorName: string = 'black';
  textDecoration: string = 'none';

  ngOnInit() {
    this.colorName = this.shoppingItem.shoppingProduct.isVeryImportant ? 'red' : 'black';
  }

  productClicked() {
    this.textDecoration = this.textDecoration === 'none' ? 'line-through' : 'none';
  }

  deleteProduct() {
    this.removeProduct.emit(this.shoppingItem.index);
  }
}
