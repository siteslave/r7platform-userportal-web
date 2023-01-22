import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserList } from '../../core/model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor (private router: Router) { }

  province: any = '';

  usersDataSet: UserList[] = [
    {
      username: 'u11053',
      first_name: 'สถิตย์',
      last_name: 'เรียนพิศ',
      email: 'rianpit@gmail.com',
      enabled: true,
      hospcode: '11053',
      hospname: 'รพ.กันทรวิชัย',
      last_login: '2023-01-13 13:04:44'
    },
    {
      username: 'u11054',
      first_name: 'ทดสอบ',
      last_name: 'ไม่เอาจริง',
      email: 'xxxx@xxxxx.com',
      enabled: false,
      hospcode: '11054',
      hospname: 'รพ.เชียงยืน',
      last_login: '2023-01-13 13:04:44'
    },
  ]

  onBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
