import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DialogCreatePokemonComponent } from './dialog-create-pokemon.component';

describe("ModalCreatePokemonComponent", () => {
  let component: DialogCreatePokemonComponent;
  let fixture: ComponentFixture<DialogCreatePokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCreatePokemonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreatePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
