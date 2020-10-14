import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = fb.group({
      title: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      category: ["BEGINNER", Validators.required],
      releasedAt: [new Date(), Validators.required],
      longDescription: ["",Validators.required]
    });

  }

  ngOnInit() {



  }

  reset() {
    this.form.reset();
  }

  onSave() {
    console.log(this.form.value);
  }

}
