import { Pipe, PipeTransform } from '@angular/core';
import {ShoppingHistoryItem} from "../utilities/shopping-history-item";
import {HistoryItemState} from "../utilities/history-item-state";

@Pipe({
  name: 'historyFilter',
  standalone: true
})
export class HistoryFilterPipe implements PipeTransform {
  transform(historyItems: ShoppingHistoryItem[], status: HistoryItemState | null, isAscending: boolean)
    : ShoppingHistoryItem[] {
    return historyItems.filter(historyItem =>
      status === null || historyItem.getCurrentTripState() === status
    ).sort((a, b) => {
      if (isAscending) {
        return new Date(a.trip.startDate).getTime() - new Date(b.trip.startDate).getTime();
      }
      return new Date(b.trip.startDate).getTime() - new Date(a.trip.startDate).getTime();
    });
  }
}
