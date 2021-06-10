import { FormGroup, ValidatorFn, Validators } from "@angular/forms";

export function dateRangeValidator(): ValidatorFn {
  return (form: FormGroup): Validators | null => {
    const start: Date = form.get("promoPeriod").value.start;
    const end: Date = form.get("promoPeriod").value.end;
    if (start && end) {
      const isRangeValid = end.getTime() - start.getTime() > 0;
      console.log("India", isRangeValid);
      return isRangeValid ? null : { isRangeInValid: true };
    }
    return null;
  };
}
