import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/common/material/material.module";
import { FilterPokemonByNamePipe } from "src/app/common/pipes/filter-pokemons.pipe";
import { DialogCreatePokemonComponent } from "./components/dialog-create-user/dialog-create-pokemon.component";
import { TablePokemonsComponent } from "./components/table-pokemons/table-pokemons.component";
import { CrudPokemonsRoutingModule } from "./crud-pokemons-routing.module";
import { CrudPokemonsComponent } from "./crud-pokemons.component";
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    CrudPokemonsComponent,
    TablePokemonsComponent,
    DialogCreatePokemonComponent,
    FilterPokemonByNamePipe,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    CrudPokemonsRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class CrudPokemonsModule {}
