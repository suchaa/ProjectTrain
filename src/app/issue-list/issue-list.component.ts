import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from '../issue.service'

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
  providers: [ IssueService ]
})
export class IssueListComponent implements OnInit {

  constructor(
    private router: Router,
    private issueService: IssueService
  ) { }

  issueData = []
  searchText = "";
  numPage = 0;
  rowPerPage = 5;
  total = 0;
  paging =[];

  ngOnInit() {
    this.search();
  }

  onEditButtonClick(id){
    this.router.navigate(['support', 'issue','findById', id]);
  }

  onDeleteButtonClick(id){
    this.issueService.deleteItem(id).subscribe(
      datas => {
        Materialize.toast('Delete complate.', 1000);
        this.search();
      },
      err => {
        console.log(err);
      });
  }

  onAddButtonClick(){
    this.router.navigate(['support', 'issue']);
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
