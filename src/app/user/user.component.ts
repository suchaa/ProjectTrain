import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service' /* import service user */

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ UserService ]
})
export class UserComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {}

  mode: string = "ADD";
  id: number = 0;
  firstName: string;
  lastName: string;
 // gender: any = ["male", "female"];
  //i: string = '';
  selectedItem: string = '';
  gender: string;
  email: string;
  password: string;
  companyData = [];

 /*  entries = [{id: 0, name: "male"},{id:1, name: "female"}];
  selectedEntry;
  onSelectionChange(entry) {
     // this.selectedEntry = entry;
      this.selectedEntry = Object.assign({}, this.selectedEntry, entry);
  } */

  /* radioChangeHandler(event: any) {
    this.selectedItem = event.target.value;
  } */

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        let id = params['id'];
        this.userService.loadItemById(id).subscribe(data => {
          Materialize.updateTextFields();
          this.firstName = data.firstName;
          this.lastName = data.lastName;
          this.gender = data.gender;
          this.email = data.email;
          this.password = data.password;
        },
          error => {
            console.log(error);
          })
        this.mode = "EDIT";
        this.id = id;
      }
    });
  }

  onSave() {
    let us = {
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      email: this.email,
      password: this.password
    }
    if (this.mode === "EDIT") {
      this.userService.updateItem(this.id, us).subscribe(
        datas => {
          Materialize.toast('Update complate.', 1000);
          this.router.navigate(['support', 'user-list']);
        },
        err => {
          console.log(err);
        });
    } else {
      this.userService.addItem(us).subscribe(
        datas => {
          Materialize.toast('Save complate.', 1000);
          this.router.navigate(['support', 'user-list']);
        },
        err => {
          console.log(err);
        });
    }
  }


}
