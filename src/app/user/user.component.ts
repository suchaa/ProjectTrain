import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../shared/user/user'
import { UserService } from '../shared/user/user.service' /* import service user */
import { UploadService } from '../shared/user/upload.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ UserService, UploadService ]
})
export class UserComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private uploadService: UploadService) {
    this.user = new User();
  }

  user: User;
  mode: string = "ADD";
  id: string = "";
  filesToUpload = [];
  url="";

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        let id = params['id'];
        this.userService.findById(id).subscribe(
          user => {
            this.user = user;
            this.url = "http://localhost:3000/user/profile/"+ id;
          }, error => {
            console.log(error);
          });
        this.mode = "EDIT";
        this.id = id;
      }
    });
  }

  onSave() {
    if (this.mode === "EDIT") {
      this.userService.updateItem(this.id, this.user).subscribe(
        datas => {
          Materialize.toast('Update complate.', 1000);
          this.upload();
          this.router.navigate(['support', 'user-list']);
        },
        err => {
          console.log(err);
        });
    } else {
      this.userService.addItem(this.user).subscribe(
        datas => {
          this.id = datas.insertedIds;
          Materialize.toast('Save complate.', 1000);
          this.upload();
          // this.router.navigate(['support', 'user-list']);
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
        environment.apiUrl + "/user/profile/" + this.id,
        [], this.filesToUpload).subscribe((res) => {
         // Materialize.toast('save complete.', 1000);
          this.router.navigate(['support', 'user-list']);
        });
    } else {
      this.router.navigate(['support', 'user-list']);
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
