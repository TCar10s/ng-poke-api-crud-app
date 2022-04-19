import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { UserResponse } from "../interfaces/api-user.interface";

@Injectable({
  providedIn: "root",
})
export class ApiUsersService {
  constructor(private http: HttpClient) {}

  public getListUsers({
    pageIndex = 0,
    pageSize = 5,
  }): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${environment.api}/users?page=${pageIndex}&per_page=${pageSize}`
    );
  }
}
