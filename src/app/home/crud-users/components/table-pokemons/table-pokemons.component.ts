import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnInit,
  Output, ViewChild
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { Pokemon } from "src/app/interfaces/poke-api.interface";
import { PokeApiLsService } from "src/app/services/poke-api-ls.service";
import { DialogCreatePokemonComponent } from '../dialog-create-user/dialog-create-pokemon.component';

@Component({
  selector: "app-table-pokemons",
  templateUrl: "./table-pokemons.component.html",
  styleUrls: ["./table-pokemons.component.scss"],
})
export class TablePokemonsComponent implements OnInit, AfterViewInit {
  public pageSizeOptions = [5, 10, 25];
  public showFirstLastButtons = true;

  public displayedColumns: string[] = [
    "name",
    "abilities",
    "types",
    "base_experience",
    "sprites",
    "edit",
    "delete",
  ];

  search: FormControl = new FormControl();

  @Input() pokemons: Pokemon[] = [];
  @Input() length = 0;
  @Input() pageSize = 0;

  @Output() onPageChange: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  public dataSource = new MatTableDataSource<Pokemon>(this.pokemons);
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public pokeApiLsService: PokeApiLsService
  ) {}

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.length = Number(localStorage.getItem("count"));
  }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap((value: string) => {
          this.onSearch.emit(value.toLocaleLowerCase());
        })
      )
      .subscribe();
  }

  public openDialog(pokemon: Pokemon): void {
    const isEdit = !!pokemon;

    const dialogRef = this.dialog.open(DialogCreatePokemonComponent, {
      data: { pokemon, isEdit } as { pokemon: Pokemon; isEdit: boolean },
    });

    const dialogSubmitSubscription =
      dialogRef.componentInstance.onSubmitForm.subscribe((result) => {
        if (isEdit) {
          this.pokeApiLsService.updatePokemonLocalStorage(result);
        } else {
          this.pokeApiLsService.addPokemonLocalStorage(result);
        }

        this.pokemons = this.pokeApiLsService.getPokemonsFromLocalStorage();

        dialogSubmitSubscription.unsubscribe();
      });
  }

  deletePokemon(pokemon: Pokemon): void {
    this.pokeApiLsService.deletePokemonLocalStorage(pokemon);
    this.pokemons = this.pokeApiLsService.getPokemonsFromLocalStorage();
  }
}
