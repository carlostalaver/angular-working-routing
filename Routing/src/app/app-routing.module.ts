import { NgModule } from '@angular/core';
import { RouterModule, CanLoad } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
// import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';
import { AuthGuard } from './user/auth.guard';

const ROUTES = [ // configuracion de las rutas
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'products',
     canActivate: [AuthGuard], // si uso este guard se descargará el modulo
    // canLoad: [AuthGuard], // canLoad por defecto BLOQUEARA la precarga de modulos
    data: { preload: true },
    /* para trabajar con la estrategia de cargar personalizada SelectiveStrategy
    con  data: { preload: true } le estoy indicando que este modulo se precargará personalizadamente*/
    loadChildren: './products/product.module#ProductModule'  /* para indicar que se esta trabajando con lazy
                                                              loading, aqui el orden importa */
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot( ROUTES, {/*  enableTracing: true ,*/preloadingStrategy: SelectiveStrategy   })
    /* enableTracing: true -> es para habilitar el rastreo de eventos de routing */
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
