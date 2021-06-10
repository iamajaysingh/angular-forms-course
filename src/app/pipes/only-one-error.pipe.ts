import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "onlyOneError",
})
export class OnlyOneError implements PipeTransform {
  transform(allErrors: any, errorPriority) {
    if (!allErrors) return null;
    const onlyError: any = {};

    /* iterate error list and assigned to onlyError object as soon as found any match in errorIbject */
    for (let error of errorPriority) {
      if (allErrors[error]) {
        onlyError[error] = allErrors[error];
        break;
      }
    }
    console.log(onlyError);
    return onlyError;
  }
}
