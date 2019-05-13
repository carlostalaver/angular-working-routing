import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoggedIn(state.url);
  }
  
  /*  este guardia es usado para la cargar asincrona de un modulo que esta bajo la
  modalidad de carga perezosa, uso el servicio Router porque este guardia no recibe los parametros que recibe
  canActivate porque canLoad no puede acceder a ActivateRouteSnapshot o RouterStateSnapshot pq el modulo que q define
  la ruta aun no esta cargado, notas en la pagina 88 de la libreta */
  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }

  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    // Retain the attempted URL for redirection
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

}
