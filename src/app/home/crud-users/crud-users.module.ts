import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/common/material/material.module';
import { FilterUserByNamePipe } from 'src/app/common/pipes/filter-users.pipe';
import { DialogCreateUserComponent } from "./components/dialog-create-user/dialog-create-user.component";
import { TableUsersComponent } from "./components/table-users/table-users.component";
import { CrudUsersRoutingModule } from "./crud-users-routing.module";
import { CrudUsersComponent } from "./crud-users.component";

@NgModule({
  declarations: [
    CrudUsersComponent,
    TableUsersComponent,
    DialogCreateUserComponent,
    FilterUserByNamePipe
  ],
  imports: [
    CommonModule,
    CrudUsersRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
})
export class CrudUsersModule {}
