import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../shared/customer/customer';
import { CustomerService } from '../shared/customer/customer.service'
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService, CompanyService]
})
export class CustomerComponent implements OnInit {

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private customerService: CustomerService,
    private companyService: CompanyService
  ) {
    this.customer = new Customer();
  }

  customer: Customer;
  companyData = [];

  mode: string = "ADD";
  id: number = 0;

  // firstName: string;
  // lastName: string;
  // email: string;
  // tel: string;
  // address: string;
  // compName: string;

  ngOnInit() {
    /* 
     this.customerService.lasdItemComp().subscribe(com => {
       this.companyData = com.rows;
 
     }, error => {
       console.log(error);
     }) */

    /*   for(let c of this.companyData){
        console.log(c.compName);
      } */

    this.activateRoute.params.subscribe(params => {
      this.companyService.loadItem().subscribe((data) => {
        this.companyData = data;
        /* setTimeout(() => {
          $('select').material_select();
        }, 100); */
      });
      if (params['id']) {
        let id = params['id'];
        this.customerService.loadItemById(id).subscribe(data => {
          this.customer = data;
          /* setTimeout(() => {
          }, 1000); */
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
    if (this.mode === 'EDIT') {
      this.customerService.updateItem(this.id, this.customer).subscribe(
        datas => {
          Materialize.toast('Update complate.', 1000);
          this.router.navigate(['support', 'customer-list']);
        },
        err => {
          console.log(err);
        });
    } else {
      this.customerService.addItem(this.customer).subscribe(
        datas => {
          Materialize.toast('Save complate.', 1000);
          this.router.navigate(['support', 'customer-list']);
        },
        err => {
          console.log(err);
        });
    }
  }

}
