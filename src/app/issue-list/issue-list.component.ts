import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from '../shared/issue/issue.service'

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
  providers: [IssueService]
})
export class IssueListComponent implements OnInit {

  issueData = []
  imgUrl = "http://localhost:3000/issue/profile/"

  searchText = "";
  numPage = 0;
  rowPerPage = 10;
  total = 0;
  paging =[];

  constructor(
    private router: Router,
    private issueService: IssueService
  ) { }

  ngOnInit() {
    this.search();
  }

  onAddButtonClick() {
    this.router.navigate(['support', 'issue']);
  }

  onDeleteClick(id) {
    this.issueService.deleteItem(id).subscribe((datas) => {
      this.loadData();
      Materialize.toast('Delete complate.', 1000);
    });
  }

  onEditButtonClick(id) {
    this.router.navigate(['support', 'issue', 'findById', id]);
  }

  onAttachClick(id) {
     this.router.navigate(['support', 'issue-attach', id]);
  }

  loadData() {
    this.issueService.loadItem().subscribe((datas) => {
      this.issueData = datas;
    });
  }

   search(){
    let searchBody = {
      searchText: this.searchText,
      rowPerPage: this.rowPerPage,
      numPage: this.numPage
    }
    this.issueService.search(searchBody).subscribe(data => {
      this.issueData = data.rows;
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
