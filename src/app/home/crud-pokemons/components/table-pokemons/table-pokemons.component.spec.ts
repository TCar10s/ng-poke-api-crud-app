import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TablePokemonsComponent } from "./table-pokemons.component";

describe("TablePokemonComponent", () => {
  let component: TablePokemonsComponent;
  let fixture: ComponentFixture<TablePokemonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TablePokemonsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
