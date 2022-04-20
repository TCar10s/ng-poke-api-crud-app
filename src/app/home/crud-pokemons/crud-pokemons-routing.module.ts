import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrudPokemonsComponent } from './crud-pokemons.component';


const routes: Routes = [{ path: '', component: CrudPokemonsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudPokemonsRoutingModule { }
