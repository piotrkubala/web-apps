import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-menu.component.html',
  styleUrl: './shopping-menu.component.css'
})
export class ShoppingMenuComponent {
  @Output() productAdded: EventEmitter<ShoppingProduct> = new EventEmitter<ShoppingProduct>();

  isMenuActive: boolean = true;
  newItemName: string = '';
  isVeryImportant: boolean = false;

  addItem() {
    if (this.newItemName === '') {
      return;
    }

    const newItem = new ShoppingProduct(this.newItemName, this.isVeryImportant);
    this.productAdded.emit(newItem);

    this.newItemName = '';
    this.isVeryImportant = false;
  }
}

export class ShoppingProduct {
  name: string;
  isVeryImportant: boolean;

  constructor(name: string, isVeryImportant: boolean) {
    this.name = name;
    this.isVeryImportant = isVeryImportant;
  }
}