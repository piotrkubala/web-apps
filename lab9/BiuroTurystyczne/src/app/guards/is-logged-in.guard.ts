import { CanActivateFn } from '@angular/router';
import {UserService} from "../services/user.service";
import {inject} from "@angular/core";

export const isLoggedInGuard: CanActivateFn = (route, state): boolean => {
  const userService = inject(UserService);

  return userService.isUserLoggedIn();
};
