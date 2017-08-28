import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  mode: string = "ADD";
  id: number = 0;

  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  address: string;
  compName: string;

  companyData = [{ compName: "company 1" }, { compName: "company 2" }, { compName: "company 3" }];
  //companyData = [];

  /*  companyData = [];
   customerData = [] */

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
      if (params['id']) {
        let id = params['id'];
        this.customerService.loadItemById(id).subscribe(data => {
          Materialize.updateTextFields();
          this.firstName = data.firstName;
          this.lastName = data.lastName;
          this.email = data.email;
          this.tel = data.tel;
          this.address = data.address;
          this.compName = data.compName;
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
    let cus = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      tel: this.tel,
      address: this.address,
      compName: this.compName
    }
    if (this.mode === 'EDIT') {
      this.customerService.updateItem(this.id, cus).subscribe(
        datas => {
          Materialize.toast('Update complate.', 1000);
          this.router.navigate(['support', 'customer-list']);
        },
        err => {
          console.log(err);
        });
    } else {
      this.customerService.addItem(cus).subscribe(
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
