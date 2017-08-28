import { Injectable } from '@angular/core';
import { CanActivate ,Router } from '@angular/router';

@Injectable()
export class LoginGuardService {

  constructor(private router:Router) { }

  canActivate(){
    /* เช็ค localStorage ว่ามีค่าหรือยัง
       มีค่า ให้ไปที่ this.router.navigate(['support', 'issue-list']); ที่หน้า login.component.ts */
    if(localStorage.getItem('token')){
      return true;
    }else{
      /* localStorage ไม่มีค่า ให้ไปที่หน้า login */
      this.router.navigate(['login']);
      return false;
    }
  }

}
