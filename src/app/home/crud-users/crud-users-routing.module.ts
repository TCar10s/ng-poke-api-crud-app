import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrudUsersComponent } from './crud-users.component';

const routes: Routes = [{ path: '', component: CrudUsersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudUsersRoutingModule { }
