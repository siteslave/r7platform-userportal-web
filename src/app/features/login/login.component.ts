import { Component } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public validateForm!: FormGroup;
  public passwordVisible: Boolean = false;

  constructor (
    public login: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.login.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }

  onSubmit(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.status == 'INVALID') {
      this.message.create('warning', 'กรุณาตรวจสอบข้อมูลให้ถูกต้อง');
      return;
    }

    if (this.validateForm.status == 'VALID') {
      let { username, password } = this.validateForm.value;
      if (username == 'admin' && password == 'admin') {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        sessionStorage.setItem('token', token);

        this.message.create('success', 'เข้าสู่ระบบสำเร็จ');

        this.router.navigate(['/dashboard'])
      } else {
        this.message.create('error', 'ชื่อผู้ใช้งาน/รหัสผ่าน ไม่ถูกต้อง');
      }
    }
  }

}
