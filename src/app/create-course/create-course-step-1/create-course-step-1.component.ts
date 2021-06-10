import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CoursesService } from "../../services/courses.service";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { courseTitleValidator } from "../../validators/course-title.validator";

interface CourseCategory {
  code: string;
  description: string;
}

@Component({
  selector: "create-course-step-1",
  templateUrl: "./create-course-step-1.component.html",
  styleUrls: ["./create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component implements OnInit {
  couses = [];
  form = this.fb.group({
    title: [
      "",
      {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(60),
        ],
        asyncValidators: [courseTitleValidator(this.courseService)],
        updateOn: "blur",
      },
    ],
    releasedAt: [new Date(), [Validators.required]],
    downloadAllowed: [false, Validators.requiredTrue],
    address: ["", { disabled: true }],
    longDescription: ["", [Validators.required, Validators.minLength(10)]],
    category: [null],
  });

  coursecategories$: Observable<CourseCategory>;

  constructor(private fb: FormBuilder, private courseService: CoursesService) {}
  ngOnInit() {
    const draft = localStorage.getItem("STEP_1");
    if (draft) {
      this.form.setValue(JSON.parse(draft));
    }
    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe((form) => {
        localStorage.setItem("STEP_1", JSON.stringify(form));
      });
    this.coursecategories$ = this.courseService.findCourseCategories();
  }

  get courseTitle() {
    return this.form.controls["title"];
  }
}
