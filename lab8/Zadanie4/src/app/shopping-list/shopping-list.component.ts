import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingMenuComponent } from './shopping-menu/shopping-menu.component';
import { ShoppingProduct } from './shopping-menu/shopping-menu.component';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingMenuComponent, CommonModule, ProductComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  shoppingItems: Map<number, ShoppingItem> = new Map<number, ShoppingItem>();
  shoppingIndexCounter: number = 0;

  addProduct(product: ShoppingProduct) {
    const shoppingItem = new ShoppingItem(product, this.shoppingIndexCounter);
    this.shoppingItems.set(this.shoppingIndexCounter++, shoppingItem);
  }

  removeProduct(index: number) {
    this.shoppingItems.delete(index);
  }

  getShoppingItems(): ShoppingItem[] {
    return Array.from(this.shoppingItems.values());
  }
}

export class ShoppingItem {
  shoppingProduct: ShoppingProduct;
  index: number;

  constructor(product: ShoppingProduct, index: number) {
    this.shoppingProduct = product;
    this.index = index;
  }
}