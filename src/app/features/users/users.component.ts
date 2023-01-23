import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AxiosError } from 'axios';
import { NzMessageService } from 'ng-zorro-antd/message';

import { UserList } from '../../core/model/user';
import { ModalNewUserComponent } from './modals/modal-new-user/modal-new-user.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor (
    private router: Router,
    private userService: UserService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.getUserList();
  }

  @ViewChild('mdlNewUser') private mdlNewUser: ModalNewUserComponent = new ModalNewUserComponent();

  province: any = '';

  usersDataSet: UserList[] = [
    {
      username: 'u11053',
      first_name: 'สถิตย์',
      last_name: 'เรียนพิศ',
      email: 'rianpit@gmail.com',
      enabled: true,
      hospitals: {
        hospcode: '11053',
        hospname: 'รพ.กันทรวิชัย',
      },
      last_login: '2023-01-13 13:04:44'
    },
    {
      username: 'u11054',
      first_name: 'ทดสอบ',
      last_name: 'ไม่เอาจริง',
      email: 'xxxx@xxxxx.com',
      enabled: false,
      hospitals: {
        hospcode: '11054',
        hospname: 'รพ.เชียงยืน',
      },
      last_login: '2023-01-13 13:04:44'
    },
  ]

  onBack(): void {
    this.router.navigate(['/dashboard']);
  }

  openNewUserRegister() {
    this.mdlNewUser.showModal();
  }

  onSubmitRegister(event: any) { }

  async getUserList() {
    const messageId = this.message.loading('Loading...', { nzDuration: 0 }).messageId;
    try {
      const data = await this.userService.getUserList();
      console.log(data);
      this.message.remove(messageId);
    } catch (error: any) {
      this.message.remove(messageId);
      this.message.error(`${error.code} - ${error.message}`);
    }
  }
}
