import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators,
} from "@angular/forms";
import { noop, Subscription } from "rxjs";

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  zipCode: number;
}

@Component({
  selector: "address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./address-form.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressFormComponent,
    },
  ],
})
export class AddressFormComponent implements OnInit, ControlValueAccessor {
  @Input()
  legend: string;

  address: {};
  onChange = (address) => {};
  onToched = () => {};
  disabled: boolean = false;
  form: FormGroup = this.fb.group({
    addressLine1: [null, [Validators.required]],
    addressLine2: [null, [Validators.required]],
    zipCode: [null, [Validators.required]],
    city: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((formObj: Address) => {
      this.address = formObj;
      this.onChange(this.address);
    });
  }

  writeValue(value: any) {
    console.log("======================2==", value);
    if (value) {
      this.form.setValue(value);
    }
  }
  registerOnChange(onChange: any): void {
    console.log("======================3.1==");
    this.form.valueChanges.subscribe((val) => onChange(val));
  }
  registerOnTouched(onToched: any): void {
    console.log("======================4==");
    this.onToched = onToched;
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log("======================5==", isDisabled);
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
