import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Optional,
  Output,
} from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MyErrorStateMatcher } from "src/app/common/material/validators/error-state-matcher";
import { Pokemon } from "src/app/interfaces/poke-api.interface";
import { PokeApiLsService } from "src/app/services/poke-api-ls.service";

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/;

@Component({
  selector: "app-dialog-create-pokemon",
  templateUrl: "./dialog-create-pokemon.component.html",
  styleUrls: ["./dialog-create-pokemon.component.scss"],
})
export class DialogCreatePokemonComponent implements OnInit {
  public form: FormGroup;
  public matcher = new MyErrorStateMatcher();

  public title = "Crear Pokemon";

  @Output() public onSubmitForm: EventEmitter<FormGroup> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogCreatePokemonComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: { pokemon: Pokemon; isEdit: boolean },
    private fb: FormBuilder,
    public pokeApiLsService: PokeApiLsService
  ) {
    this.form = this.fb.group({});
  }

  public ngOnInit(): void {
    this.loadForm();

    const { pokemon, isEdit } = this.data;

    if (isEdit) {
      this.form.patchValue(pokemon);
    }
  }

  private loadForm(): void {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      ability: ["", [Validators.required]],
      type: ["", [Validators.required]],
      base_experience: ["", [Validators.required]],
      imageUrl: ["", [Validators.required, Validators.pattern(URL_REGEX)]],
      id: [""],
    });
  }

  public onSubmit(): void {
    this.onSubmitForm.emit(this.form.value);
  }

  public get name(): AbstractControl {
    return this.form.get("name");
  }

  public get ability(): AbstractControl {
    return this.form.get("ability");
  }

  public get type(): AbstractControl {
    return this.form.get("type");
  }

  public get image(): AbstractControl {
    return this.form.get("imageUrl");
  }
}
