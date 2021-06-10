import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor() {}
  login(loginForm: NgForm, event) {
    console.log(loginForm.value, event);
  }

  changeDetection(event) {
    console.log(event);
  }

  ngOnInit() {}
}
