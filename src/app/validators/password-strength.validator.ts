import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/* A function that receives a control and synchronously
 returns a map of validation errors if present, otherwise null. */
export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? { passwordValid: true } : null;
  };
}
