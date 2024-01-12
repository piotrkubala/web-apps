import { Routes } from '@angular/router';
import {TripBoardComponent} from "./components/trip-board/trip-board.component";
import {HomeComponent} from "./components/home/home.component";
import {TripCreatorComponent} from "./components/trip-board/trip-creator/trip-creator.component";
import {ShoppingHistoryComponent} from "./components/shopping-history/shopping-history.component";
import {ShoppingBasketComponent} from "./components/shopping-basket/shopping-basket.component";
import {TripDetailsComponent} from "./components/trip-details/trip-details.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {isManagerGuard} from "./guards/is-manager.guard";
import {isNormalUserGuard} from "./guards/is-normal-user.guard";
import {isLoggedInGuard} from "./guards/is-logged-in.guard";
import {isNotLoggedInGuard} from "./guards/is-not-logged-in.guard";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trip-board', component: TripBoardComponent },
  { path: 'trips/:id', component: TripDetailsComponent, canActivate: [isNormalUserGuard] },
  { path: 'creator', component: TripCreatorComponent, canActivate: [isManagerGuard] },
  { path: 'shopping-basket', component: ShoppingBasketComponent, canActivate: [isNormalUserGuard] },
  { path: 'history', component: ShoppingHistoryComponent, canActivate: [isNormalUserGuard] },
  { path: 'login', component: LoginComponent, canActivate: [isNotLoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [isNotLoggedInGuard] },
  { path: '**', redirectTo: '' }
];
