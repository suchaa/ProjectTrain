import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [ CompanyService ]
})
export class CompanyComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService)
  { }

  mode: string = "ADD";
  id: number = 0;
  compCode: string;
  compName: string;
  companyData = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        let id = params['id'];
        // let companyData = JSON.parse(localStorage.getItem('company'));
        // let company = companyData[id];
        // this.compCode = company.compCode;
        // this.compName = company.compName;
        this.companyService.loadItemById(id).subscribe(data => {
          //Materialize.updateTextFields(); /* npm install angular2-materialize --save แล้วไปใส่ใน html แทน */
          this.compCode = data.compCode;
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
    let comp = {
      compCode: this.compCode,
      compName: this.compName
    }

    //ดูว่ามีข้อมูลใน localStorage หรือยัง
    let company: Array<any> = [];
    if (localStorage.getItem('company')) {
      company = JSON.parse(localStorage.getItem('company'));
    }

    /* เช็คว่าเป็น mode edit หรือ add */
    if (this.mode === "EDIT") {
      /* company[this.id] = comp;*/
      this.companyService.updateItem(this.id, comp).subscribe(
        datas => {
          Materialize.toast('Update complate.', 1000);
          this.router.navigate(['support', 'company-list']);
        },
        err => {
          console.log(err);
        });
    } else {
      /* company.push(comp); //push ลง localStorage */
      this.companyService.addItem(comp).subscribe(
        datas => {
          Materialize.toast('Save complate.', 1000);
          this.router.navigate(['support', 'company-list']);
        },
        err => {
          console.log(err);
        });
    }
    /* localStorage.setItem('company', JSON.stringify(company)); */
  }

}
