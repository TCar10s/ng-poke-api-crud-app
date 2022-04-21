import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate, RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Injectable({ providedIn: "root" })
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const session = this.authService.isLoggedIn();

    return !session;
  }
}
