import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service' /* import service company */

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
  providers: [ CompanyService ]
})
export class CompanyListComponent implements OnInit {

  constructor(
    private router: Router,
    private companyService: CompanyService)
  { }

  companyData = [];
  searchText = "";
  numPage = 0;
  rowPerPage = 10;
  total = 0;
  paging =[];

  // loadItem() {
  //    /* core loadItem ที่ Service 
  //     .subscribe เมื่อมีการเปลี่ยนแปลข้อมูลให้มาทำ
  //     เพื่อรับข้อมูลที่ส่งมาจาก service*/
  //   this.companyService.loadItem().subscribe(
  //     datas => {
  //       this.companyData = datas;
  //     },
  //     err => {
  //       console.log(err);
  //     });
  // }

  ngOnInit() {
    /*  if(localStorage.getItem('company')){
      this.companyData = JSON.parse(localStorage.getItem('company'));
    }  */

    //this.loadItem();
    this.search();
  }

  onAddButtonClick() {
    this.router.navigate(['support', 'company']);
  }

  onDeleteButtonClick(id) {
    /* this.companyData.splice(id, 1); //ลบจากหน้าจออย่างเดียว
    localStorage.setItem('company', JSON.stringify(this.companyData)); //ลบออกจาก localStorage  */

    this.companyService.deleteItem(id).subscribe(
      datas => {
        Materialize.toast('Delete complate.', 1000);
        this.search();
      },
      err => {
        console.log(err);
      });
  }

  onEditButtonClick(id) {
    this.router.navigate(['support', 'company','findById', id]);
  }

  search(){
    let searchBody = {
      searchText: this.searchText,
      rowPerPage: this.rowPerPage,
      numPage: this.numPage
    }
    this.companyService.search(searchBody).subscribe(data => {
      this.companyData = data.rows;
      
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
