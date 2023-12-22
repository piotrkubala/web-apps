import { Component } from '@angular/core';
import {ShoppingHistoryService} from "../shopping-history.service";
import {NgForOf, NgIf} from "@angular/common";
import {ShoppingItemComponent} from "./shopping-item/shopping-item.component";

@Component({
  selector: 'app-shopping-history',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ShoppingItemComponent
  ],
  templateUrl: './shopping-history.component.html',
  styleUrl: './shopping-history.component.css'
})
export class ShoppingHistoryComponent {
  constructor(public shoppingHistoryService: ShoppingHistoryService) {}

  isShoppingHistoryEmpty() {
    return this.shoppingHistoryService.isShoppingHistoryEmpty();
  }
}
