import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "create-course-step-3",
  templateUrl: "create-course-step-3.component.html",
  styleUrls: ["create-course-step-3.component.scss"],
})
export class CreateCourseStep3Component implements OnInit {
  form = this.fb.group({
    lessons: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}

  addLesson() {
    const lesson = this.fb.group({
      title: ["", Validators.required],
      level: ["beginner", Validators.required],
    });
    this.lessons.push(lesson);
  }
  deleteLesson(lessonIndex) {
    this.lessons.removeAt(lessonIndex);
  }

  get lessons() {
    return this.form.controls["lessons"] as FormArray;
  }
}
