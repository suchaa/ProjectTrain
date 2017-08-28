import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import  {  HomeComponent  }  from  './home/home.component';
import  {  LoginComponent  }  from  './login/login.component';
import { CompanyComponent } from './company/company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { IssueComponent } from './issue/issue.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { SupportZoneComponent } from './support-zone/support-zone.component';
import { PublicZoneComponent } from './public-zone/public-zone.component';
import { LoginGuardService } from './login-guard.service';

const routes: Routes = [
  {
    /* root หลัก */
    path: '',
    component: PublicZoneComponent,
    children: [{
      path: '', component: HomeComponent /* default path */
    },{
      /* จะเอา HomeComponent มา render ให้ตรงตำแหน่ง router-outlet ใน app.component.html */
      path: 'home', component: HomeComponent
    }, {
      path: 'login', component: LoginComponent
    }]
  }, {
    path: 'support', /* เจอ path ที่เป็น support ต้องทำ canActivate' */
    canActivate: [LoginGuardService], /* canActivate คือบอกว่า สามารถเข้าได้หรือป่าว (token ต้องมีค่าถึงจะ render หน้านั้นๆ ได้) */
    component: SupportZoneComponent,
    children: [{
      path: '', component: IssueListComponent /* default path */
    },{
      path: 'company', component: CompanyComponent
    },{ 
      path: 'company/:id', component: CompanyComponent
    },
    { /* เพิ่ม path ที่มีการรับ parameter สำหรับ edit*/
      path: 'company/findById/:id', component: CompanyComponent
    },{
      path: 'company-list', component: CompanyListComponent
    },{
      path: 'customer', component: CustomerComponent
    },{
      path: 'customer-list', component: CustomerListComponent
    },{ /* เพิ่ม path ที่มีการรับ parameter สำหรับ edit*/
      path: 'customer/findById/:id', component: CustomerComponent
    },{
      path: 'issue', component: IssueComponent
    },{
      path: 'issue-list', component: IssueListComponent
    },{ /* เพิ่ม path ที่มีการรับ parameter สำหรับ edit*/
      path: 'issue/findById/:id', component: IssueComponent
    },{
      path: 'user', component: UserComponent
    },{
      path: 'user-list', component: UserListComponent
    },{ /* เพิ่ม path ที่มีการรับ parameter สำหรับ edit*/
      path: 'user/findById/:id', component: UserComponent
    },]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
