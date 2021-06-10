import { Directive } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength.validator";
// Decorator that marks a class as an Angular directive. You can define your own directives to attach custom behavior to elements in the DOM.
@Directive({
  selector: "[passwardStrength]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordStrengthDirective,
      multi: true,
    },
  ],
})
export class PasswordStrengthDirective implements Validator {
  // Method that performs synchronous validation against the provided control.
  validate(control: AbstractControl): ValidationErrors {
    return createPasswordStrengthValidator()(control);
  }
}
