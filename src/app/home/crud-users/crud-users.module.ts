import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { CrudUsersRoutingModule } from "./crud-users-routing.module";
import { CrudUsersComponent } from "./crud-users.component";
import { TableUsersComponent } from "./components/table-users/table-users.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogCreateUserComponent } from './components/dialog-create-user/dialog-create-user.component';

@NgModule({
  declarations: [
    CrudUsersComponent,
    TableUsersComponent,
    DialogCreateUserComponent,
  ],
  imports: [
    CommonModule,
    CrudUsersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule
  ],
})
export class CrudUsersModule {}
