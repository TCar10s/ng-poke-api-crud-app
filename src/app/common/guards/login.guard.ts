import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate, Router, RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Injectable({ providedIn: "root" })
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const session = this.authService.isLoggedIn();

    if(session) {
      this.router.navigate(["/home"]).then();
      return false;
    }

    return true;
  }
}
