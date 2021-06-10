import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";
import { Course } from "../model/course";

export function courseTitleValidator(
  coursesService: CoursesService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return coursesService.findAllCourses().pipe(
      map((v) => {
        const course = v.find(
          (course) =>
            course.description.toLowerCase() === control.value.toLowerCase()
        );
        return course ? { titleExists: true } : null;
      })
    );
  };
}
