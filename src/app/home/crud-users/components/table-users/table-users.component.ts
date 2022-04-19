import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { User } from "src/app/interfaces/user.type";

@Component({
  selector: "app-table-users",
  templateUrl: "./table-users.component.html",
  styleUrls: ["./table-users.component.scss"],
})
export class TableUsersComponent implements OnInit, AfterViewInit {
  public pageSizeOptions = [5, 10, 25];
  public showFirstLastButtons = true;

  public displayedColumns: string[] = [
    "first_name",
    "last_name",
    "email",
    "avatar",
  ];

  @Input() users: User[] = [];
  @Input() length = 0;
  @Input() pageSize = 0;

  @Output() onPageChange: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();

  public dataSource = new MatTableDataSource<User>(this.users);
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor() {}

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {}
}
