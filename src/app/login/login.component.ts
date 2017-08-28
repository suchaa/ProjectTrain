import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) {

  }
  
  /* ประกาศ property */
  email:string;
  password:string;

  ngOnInit() {
    Materialize.updateTextFields();
  }

  doLogin() {
      if ($(".invalid").length > 0) {
      Materialize.toast('Invalid', 1000);
    } else {
      //เก็บ token ชื่อ login ใว่ใน localStorage
      //จะไปทำที่ login-guard.service.ts
      window.localStorage.setItem('token', 'login');
      //validate ผ่านแล้วจะให้วิ่งไปไหน
      this.router.navigate(['support', 'issue-list']);
    }
  }
  
}
