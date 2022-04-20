import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MyErrorStateMatcher } from "src/app/common/material/validators/error-state-matcher";

@Component({
  selector: "app-dialog-create-user",
  templateUrl: "./dialog-create-user.component.html",
  styleUrls: ["./dialog-create-user.component.scss"],
})
export class DialogCreateUserComponent implements OnInit {
  public form: FormGroup;
  public matcher = new MyErrorStateMatcher();

  @Output() public onSubmitForm: EventEmitter<FormGroup> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  public ngOnInit(): void {
    this.loadForm();
  }

  private loadForm(): void {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  public onSubmit(): void {
    this.onSubmitForm.emit(this.form);
  }

  public get name(): AbstractControl {
    return this.form.get("name");
  }

  public get lastName(): AbstractControl {
    return this.form.get("lastName");
  }

  public get email(): AbstractControl {
    return this.form.get("email");
  }
}
