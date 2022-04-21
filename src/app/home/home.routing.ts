import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../common/guards/auth.guard';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: { roles: ['dashboard_access'], preload: true},
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
      },
      {
        path: 'crud-pokemons',
        loadChildren: () => import('./crud-pokemons/crud-pokemons.module').then((m) => m.CrudPokemonsModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
      },
      {
        path: "**",
        redirectTo: "dashboard",
        pathMatch: "full"
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
