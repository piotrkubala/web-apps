import { Routes } from '@angular/router';
import {TripBoardComponent} from "./components/trip-board/trip-board.component";
import {HomeComponent} from "./components/home/home.component";
import {TripCreatorComponent} from "./components/trip-board/trip-creator/trip-creator.component";
import {ShoppingHistoryComponent} from "./components/shopping-history/shopping-history.component";
import {ShoppingBasketComponent} from "./components/shopping-basket/shopping-basket.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trip-board', component: TripBoardComponent },
  { path: 'creator', component: TripCreatorComponent },
  { path: 'shopping-basket', component: ShoppingBasketComponent },
  { path: 'history', component: ShoppingHistoryComponent },
  { path: '**', redirectTo: '' }
];
