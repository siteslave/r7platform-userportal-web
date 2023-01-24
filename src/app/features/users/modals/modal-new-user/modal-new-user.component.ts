
import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ICreateUser } from '../../../../core/model/user';
import { RandomstringService } from '../../../../core/services/randomstring.service';
import { LibService } from '../../../../shared/services/lib.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal-new-user',
  templateUrl: './modal-new-user.component.html',
  styleUrls: ['./modal-new-user.component.css']
})
export class ModalNewUserComponent {

  validateForm!: UntypedFormGroup;

  @Output() onSubmit = new EventEmitter<any>();

  isVisible = false;
  hospitals: any = [];
  zones: any = [];

  constructor (
    private randomString: RandomstringService,
    private libService: LibService,
    private userService: UserService,
    private message: NzMessageService,
    private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      zoneCode: [null, [Validators.required]],
      hospcode: [null, [Validators.required]],
      enabled: [true]
    });

    // Get zones
    this.getZones();

  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      let user: ICreateUser = {
        username: this.validateForm.value.username,
        password: this.validateForm.value.password,
        first_name: this.validateForm.value.firstName,
        last_name: this.validateForm.value.lastName,
        email: this.validateForm.value.email,
        hospcode: this.validateForm.value.hospcode,
        enabled: this.validateForm.value.enabled ? 'Y' : 'N'
      };

      this.doRegister(user);

      return;
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
  }

  handleCancel(): void {
    this.validateForm.reset();
    this.isVisible = false;
  }

  async doRegister(user: ICreateUser) {
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId;
    try {
      await this.userService.save(user);
      this.message.remove(messageId);
      this.isVisible = false;
      this.onSubmit.emit(true);
    } catch (error: any) {
      this.message.remove(messageId);
      this.message.error(`${error.code} - ${error.message}`);
    }
  }

  randomPassword() {
    const randomPassword = this.randomString.generateRandomString();
    this.validateForm.patchValue({ password: randomPassword });
  }

  onChangeProvince(event: any) {
    this.getHospitals(event);
  }

  async getHospitals(zoneCode: any) {
    const messageId = this.message.loading('Loading...', { nzDuration: 0 }).messageId;
    try {
      const response = await this.libService.getHospitals(zoneCode);
      this.hospitals = response.data;
      this.message.remove(messageId);
    } catch (error: any) {
      this.message.remove(messageId);
      this.message.error(`${error.code} - ${error.message}`);
    }
  }

  async getZones() {
    const messageId = this.message.loading('Loading...', { nzDuration: 0 }).messageId;
    try {
      const response = await this.libService.getZones();
      this.zones = response.data.map((v: any) => {
        v.name = `${v.name} (${v.ingress_zone})`;
        return v;
      });
      this.message.remove(messageId);
    } catch (error: any) {
      this.message.remove(messageId);
      this.message.error(`${error.code} - ${error.message}`);
    }
  }

}
