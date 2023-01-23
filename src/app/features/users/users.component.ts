import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  usersDataSet: UserList[] = [];

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
      const response = await this.userService.getUserList();
      this.usersDataSet = response.data;
      this.message.remove(messageId);
    } catch (error: any) {
      this.message.remove(messageId);
      this.message.error(`${error.code} - ${error.message}`);
    }
  }
}
