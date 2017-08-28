import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from '../issue.service'

import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser'
import { MaterializeModule } from "angular2-materialize";

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  providers: [ IssueService ]
})

export class IssueComponent implements OnInit {
 /*  name:string; */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private issueService: IssueService
  ){ 
    /* this.birthdate = new Date('03/12/2017'); */
  }

  birthdate: Date;
  mode: string = "ADD";
  id: number = 0;
  email: string;
  issue:string;
  issue_date: Date;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        let id = params['id'];
        this.issueService.loadItemById(id).subscribe(data => {
          Materialize.updateTextFields();
          this.email = data.email;
          this.issue = data.issue;
          this.issue_date = new Date();
        },
          error => {
            console.log(error);
          })
        this.mode = "EDIT";
        this.id = id;
      }
    });
  }

  onSave(){
    let us = {
      email: this.email,
      issue: this.issue,
      issue_date: this.issue_date
    }
    if (this.mode === "EDIT") {
      this.issueService.updateItem(this.id, us).subscribe(
        datas => {
          Materialize.toast('Update complate.', 1000);
          this.router.navigate(['support', 'issue-list']);
        },
        err => {
          console.log(err);
        });
    } else {
      this.issueService.addItem(us).subscribe(
        datas => {
          Materialize.toast('Save complate.', 1000);
          this.router.navigate(['support', 'issue-list']);
        },
        err => {
          console.log(err);
        });
    }

  }
}

@NgModule({
  imports: [ BrowserModule, MaterializeModule,FormsModule ],
  declarations: [ IssueComponent ],
  bootstrap: [ IssueComponent ],
})
export class AppModule {}

