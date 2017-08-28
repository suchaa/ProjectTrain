import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service'

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {

  constructor(
    private router: Router,
    private customerService: CustomerService) { }

  customerData = [];
  searchText = "";
  numPage = 0;
  rowPerPage = 5;
  total = 0;
  paging = [];

  ngOnInit() {
    this.search();
  }

  onAddButtonClick() {
    this.router.navigate(['support', 'customer']);
  }

  onEditButtonClick(id) {
    this.router.navigate(['support', 'customer', 'findById', id]);
  }

  onDeleteButtonClick(id) {
    this.customerService.deleteItem(id).subscribe(
      datas => {
        Materialize.toast('Delete complate.', 1000);
        this.search();
      },
      err => {
        console.log(err);
      });
  }

  search() {
    let searchBody = {
      searchText: this.searchText,
      rowPerPage: this.rowPerPage,
      numPage: this.numPage
    }
    this.customerService.search(searchBody).subscribe(data => {
      this.customerData = data.rows;
      this.total = data.total;
      this.renderPaging();
    }, error => {
      console.log(error);
    });
  }

  renderPaging() {
    let allPage = Math.ceil(this.total / this.rowPerPage);
    this.paging = [];
    for (let i = 0; i < allPage; i++) {
      this.paging.push(i + 1);
    }
  }

  gotoPage(pId) {
    this.numPage = pId;
    this.search();
  }

}
