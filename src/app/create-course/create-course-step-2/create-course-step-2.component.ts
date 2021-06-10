import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { dateRangeValidator } from "../../validators/date-range.validator";

@Component({
  selector: "create-course-step-2",
  templateUrl: "create-course-step-2.component.html",
  styleUrls: ["create-course-step-2.component.scss"],
})
export class CreateCourseStep2Component implements OnInit {
  form = this.fb.group(
    {
      courseType: [null],
      price: [
        "",
        [
          Validators.required,
          Validators.min(0),
          Validators.max(9999),
          Validators.pattern("[0-9]+"),
        ],
      ],
      thumnail: [null],
      promoPeriod: this.fb.group({
        start: [""],
        end: [""],
      }),
    },
    { validators: [dateRangeValidator()] }
  );
  /* { "courseType": null, "price": "", 
"range": { "start": "2021-06-06T18:30:00.000Z", "end": "2021-06-24T18:30:00.000Z" } } */

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.form.valueChanges.subscribe((val) => {
      const priceControl = this.form.controls["price"];
      if (val.courseType === "free" && priceControl.enable) {
        priceControl.disable({ emitEvent: false });
      } else if (val.courseType === "premium" && priceControl.disabled) {
        priceControl.enable({ emitEvent: false });
      }
    });
  }
}
