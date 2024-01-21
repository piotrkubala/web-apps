import { Component } from '@angular/core';
import {ShoppingHistoryService} from "../../services/shopping-history.service";
import {NgForOf, NgIf} from "@angular/common";
import {ShoppingItemComponent} from "./shopping-item/shopping-item.component";
import {HistoryItemState} from "../../utilities/history-item-state";
import {HistoryFilterPipe} from "../../pipes/history-filter.pipe";

@Component({
  selector: 'app-shopping-history',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ShoppingItemComponent,
    HistoryFilterPipe
  ],
  templateUrl: './shopping-history.component.html',
  styleUrl: './shopping-history.component.css'
})
export class ShoppingHistoryComponent {
  protected readonly HistoryItemState = HistoryItemState;
  isSortingAscending = true;
  statusFilter: HistoryItemState | null = null;

  constructor(public shoppingHistoryService: ShoppingHistoryService) {
    this.shoppingHistoryService.onShoppingHistoryChanged.subscribe(() => {
      this.isSortingAscending = this.isSortingAscending ?? true;
    });
  }

  isShoppingHistoryEmpty() {
    return this.shoppingHistoryService.isShoppingHistoryEmpty();
  }

  filterVisibleByStatus(status: HistoryItemState | null) {
    this.statusFilter = status;
  }

  setSortingOrder(isAscending: boolean) {
    this.isSortingAscending = isAscending;
  }

  getShoppingHistoryItems() {
    return this.shoppingHistoryService.shoppingHistoryItems;
  }
}
