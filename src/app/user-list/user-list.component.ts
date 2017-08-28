import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service' /* import service user */

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [ UserService ]
})
export class UserListComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  userData = []
  searchText = "";
  numPage = 0;
  rowPerPage = 5;
  total = 0;
  paging =[];

  ngOnInit() {
    this.search();
  }

  onAddButtonClick() {
    this.router.navigate(['support', 'user']);
  }

  onEditButtonClick(id) {
    this.router.navigate(['support', 'user','findById', id]);
  }

  onDeleteButtonClick(id) {
    this.userService.deleteItem(id).subscribe(
      datas => {
        Materialize.toast('Delete complate.', 1000);
        this.search();
      },
      err => {
        console.log(err);
      });
  }

  search(){
    let searchBody = {
      searchText: this.searchText,
      rowPerPage: this.rowPerPage,
      numPage: this.numPage
    }
    this.userService.search(searchBody).subscribe(data => {
      this.userData = data.rows;
      this.total = data.total;
      this.renderPaging();
    }, error =>{
      console.log(error);
    });
  }

  renderPaging(){
    let allPage = Math.ceil( this.total / this.rowPerPage);
    this.paging = [];
    for(let i=0; i<allPage; i++){
      this.paging.push(i+1);
    }
  }

  gotoPage(pId){
    this.numPage = pId;
    this.search();
  }

}
