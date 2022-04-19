import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CrudUsersComponent } from "./crud-users.component";
import { CrudUsersRoutingModule } from "./crud-users-routing.module";
import { MatTableModule } from "@angular/material/table";
import { ModalComponent } from './components/modal/modal.component';
import { FormCreateUserComponent } from './components/form-create-user/form-create-user.component';

@NgModule({
  declarations: [CrudUsersComponent, ModalComponent, FormCreateUserComponent],
  imports: [CommonModule, CrudUsersRoutingModule, MatTableModule],
})
export class CrudUsersModule {}
