import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Issue } from '../shared/issue/issue'
import { environment } from '../../environments/environment';

import { IssueService } from '../shared/issue/issue.service'
import { UploadService } from '../shared/user/upload.service';
import { CompanyService } from '../company.service';
import { CustomerService } from '../shared/customer/customer.service'
import { UserService } from '../shared/user/user.service';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { MaterializeModule } from "angular2-materialize";

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  providers: [IssueService, UploadService, CompanyService, CustomerService, UserService]
})

export class IssueComponent implements OnInit {
  /*  name:string; */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private issueService: IssueService,
    private uploadService: UploadService,
    private companyService: CompanyService,
    private customerService: CustomerService,
    private userService: UserService
  ) {
    this.issue = new Issue();
    /* this.birthdate = new Date('03/12/2017'); */
  }

  issue: Issue;
  companyData = [];
  customerData = [];
  userData = [];

  mode: string = "ADD";
  id: string = "";
  filesToUpload = [];
  url = "";

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

      this.companyService.loadItem().subscribe((comp) => {
        this.companyData = comp;
      });
      this.customerService.loadItem().subscribe((cus) => {
        this.customerData = cus;
      });
      this.userService.loadItem().subscribe((users) => {
        this.userData = users;
      });

      if (params['id']) {
        let id = params['id'];
        this.issueService.loadItemById(id).subscribe(
          issues => {
           // console.log(issues);
            
            this.issue = issues;
            //this.url = "http://localhost:3000/issue/profile/"+ id;
        },
          error => {
            console.log(error);
          });
        this.mode = "EDIT";
        this.id = id;
      }
    });
  }

  onSave(id) {
    if (this.mode === "EDIT") {
      this.issueService.updateItem(this.id, this.issue).subscribe(
        datas => {
          Materialize.toast('Update complate.', 1000);
          //this.upload();
          this.router.navigate(['support', 'issue-list']);
        },
        err => {
          console.log(err);
        });
    } else {
      this.issueService.addItem(this.issue).subscribe(
        datas => {
          this.id = datas.insertedIds;
          
          Materialize.toast('Save complate.', 1000);
          //this.upload();
          this.router.navigate(['support', 'issue-attach', id]);
          //this.router.navigate(['support','issue']);
        },
        err => {
          console.log(err);
        });
    }
  }

  fileChangeEvent(fileInput) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  upload() {
    if (this.filesToUpload.length > 0) {
      this.uploadService.makeFileRequest(
        "avatar",
        environment.apiUrl + "/issue/profile/" + this.id,
        [], this.filesToUpload).subscribe((res) => {
         // Materialize.toast('save complete.', 1000);
          this.router.navigate(['support', 'issue-list']);
        });
    } else {
      this.router.navigate(['support', 'issue-list']);
    }
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event) => {
        this.url = event.target["result"];
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

}

 @NgModule({
  imports: [BrowserModule, MaterializeModule, FormsModule],
  declarations: [IssueComponent],
  bootstrap: [IssueComponent],
})
export class AppModule { } 

