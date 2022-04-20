import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DialogCreateUserComponent } from "../dialog-create-user/dialog-create-user.component";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { User } from "src/app/interfaces/api-user.interface";
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

  search: FormControl = new FormControl();
  searchTerm = "";

  @Input() users: User[] = [];
  @Input() length = 0;
  @Input() pageSize = 0;

  @Output() onPageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  public dataSource = new MatTableDataSource<User>(this.users);
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(public dialog: MatDialog) {}

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap((value) =>  this.searchTerm = value)
      )
      .subscribe();
  }

  public openDialog() {
    const dialogRef = this.dialog.open(DialogCreateUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
