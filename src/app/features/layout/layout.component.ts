import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  jwtHelper: JwtHelperService = new JwtHelperService();
  hospname: any;

  constructor (
    private router: Router,
    private modal: NzModalService,
  ) {
    const token: any = sessionStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);
    this.hospname = decoded.hospname;
  }

  logout() {

    this.modal.confirm({
      nzTitle: '<b>ยืนยัน</b>',
      nzContent: 'ออกจากระบบ?',
      nzOnOk: () => {
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    });

  }

}
