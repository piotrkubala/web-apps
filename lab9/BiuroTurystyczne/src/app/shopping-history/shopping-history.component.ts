import { Component } from '@angular/core';
import {ShoppingHistoryService} from "../shopping-history.service";
import {NgForOf, NgIf} from "@angular/common";
import {ShoppingItemComponent} from "./shopping-item/shopping-item.component";
import {HistoryItemState} from "../history-item-state";
import {HistoryFilterPipe} from "./history-filter.pipe";

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

  constructor(public shoppingHistoryService: ShoppingHistoryService) {}

  isShoppingHistoryEmpty() {
    return this.shoppingHistoryService.isShoppingHistoryEmpty();
  }

  filterVisibleByStatus(status: HistoryItemState | null) {
    this.statusFilter = status;
  }

  setSortingOrder(isAscending: boolean) {
    this.isSortingAscending = isAscending;
  }
}
