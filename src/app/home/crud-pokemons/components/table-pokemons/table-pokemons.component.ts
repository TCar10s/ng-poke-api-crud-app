import {
  AfterContentInit, Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { Pokemon } from "src/app/interfaces/poke-api.interface";
import { PokeApiLsService } from "src/app/services/poke-api-ls.service";
import { ToastService } from "src/app/services/toast.service";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { DialogCreatePokemonComponent } from "../dialog-create-user/dialog-create-pokemon.component";

@Component({
  selector: "app-table-pokemons",
  templateUrl: "./table-pokemons.component.html",
  styleUrls: ["./table-pokemons.component.scss"],
})
export class TablePokemonsComponent implements OnInit, AfterContentInit {
  public pageSizeOptions = [5, 10, 25];
  public showFirstLastButtons = true;

  public displayedColumns: string[] = [
    "name",
    "abilities",
    "types",
    "sprites",
    "edit",
    "delete",
  ];

  search: FormControl = new FormControl();

  @Input() pokemons: Pokemon[] = [];
  @Input() length = 0;
  @Input() pageSize = 5;
  @Input() pageIndex= 0;

  @Output() pageChange: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

  public dataSource = new MatTableDataSource<Pokemon>(this.pokemons);
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private pokeApiLsService: PokeApiLsService,
    private tostService: ToastService
  ) {}

  public ngAfterContentInit(): void {
    this.dataSource.paginator = this.paginator;

    this.length = Number(localStorage.getItem("count"));
    this.pageIndex = Number(localStorage.getItem("pageIndex"));
  }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap((value: string) => {
          this.searchEvent.emit(value.toLocaleLowerCase());
        })
      )
      .subscribe();
  }

  public openDialog(pokemon: Pokemon): void {
    const isEdit = !!pokemon;

    const dialogRef = this.dialog.open(DialogCreatePokemonComponent, {
      data: { pokemon, isEdit } as { pokemon: Pokemon; isEdit: boolean },
      panelClass: "custom-modalbox",
    });

    const dialogSubmitSubscription =
      dialogRef.componentInstance.onSubmitForm.subscribe((result) => {
        isEdit ? this.updatePokemon(result) : this.addPokemon(result);

        this.pokemons = this.pokeApiLsService.getPokemonsFromLocalStorage();

        dialogSubmitSubscription.unsubscribe();
      });
  }

  showDialog(pokemon: Pokemon): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: `¿Estás seguro de eliminar el Pokemon ${pokemon.name}?`,
        panelClass: "custom-modalbox",
      })
      .afterClosed()
      .subscribe((confirm: Boolean) => {
        if (confirm) {
          this.deletePokemon(pokemon);
        } else {
          this.tostService.info("Operación cancelada", "Cancelado");
        }
      });
  }

  updatePokemon(pokemon: Pokemon): void {
    this.pokeApiLsService.updatePokemonLocalStorage(pokemon);
    this.tostService.success("Pokemon editado", "¡Éxito!");
  }

  addPokemon(pokemon: Pokemon): void {
    this.pokeApiLsService.addPokemonLocalStorage(pokemon);
    this.tostService.success("Pokemon agregado", "¡Éxito!");
  }

  deletePokemon(pokemon: Pokemon): void {
    this.pokeApiLsService.deletePokemonLocalStorage(pokemon);
    this.pokemons = this.pokeApiLsService.getPokemonsFromLocalStorage();

    this.tostService.success("Pokemon eliminado con éxito", "¡Éxito!");
  }
}
