import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
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
import { TransfPipe } from './transf.pipe';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CompanyComponent,
    CompanyListComponent,
    CustomerComponent,
    CustomerListComponent,
    UserComponent,
    UserListComponent,
    IssueComponent,
    IssueListComponent,
    SupportZoneComponent,
    PublicZoneComponent,
    TransfPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [LoginGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
