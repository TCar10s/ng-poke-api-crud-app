import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { User } from "../../interfaces/api-user.interface";
import { ApiUsersService } from "../../services/api-users.service";

const INITIAL_PAGINATOR_VALUE = {
  length: 0,
  pageIndex: 0,
  pageSize: 5,
};

@Component({
  selector: "app-crud-users",
  templateUrl: "./crud-users.component.html",
  styleUrls: ["./crud-users.component.scss"],
})
export class CrudUsersComponent implements OnInit {
  public length = 0;
  public pageSize = 0;

  public users: User[] = [];

  constructor(private apiUsersService: ApiUsersService) {}

  public ngOnInit(): void {
    this.getListUsers(INITIAL_PAGINATOR_VALUE);
  }

  public getListUsers(event: PageEvent): void {
    this.apiUsersService.getListUsers(event).subscribe((response) => {
      this.users = response.data;

      this.saveInLocalStorage(this.users);

      this.pageSize = response.per_page;
      this.length = response.total;
    });
  }

  public saveInLocalStorage(users: User[]): void {
    localStorage.setItem("users", JSON.stringify(users));
  }
}
