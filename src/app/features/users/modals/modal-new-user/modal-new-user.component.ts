
import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RandomstringService } from '../../../../core/services/randomstring.service';

@Component({
  selector: 'app-modal-new-user',
  templateUrl: './modal-new-user.component.html',
  styleUrls: ['./modal-new-user.component.css']
})
export class ModalNewUserComponent {

  validateForm!: UntypedFormGroup;
  private fb: UntypedFormBuilder = new UntypedFormBuilder();;

  @Output() onSubmit = new EventEmitter<any>();

  isVisible = false;

  private randomString: RandomstringService = new RandomstringService();

  constructor () { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required]],
      provinceCode: [null, [Validators.required]],
      hospcode: [null, [Validators.required]],
      enabled: [true]
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    // console.log('Button ok clicked!');
    // this.isVisible = false;
    // this.onSubmit.emit(true);
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
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
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  randomPassword() {
    const randomPassword = this.randomString.generateRandomString();
    console.log(randomPassword);
    this.validateForm.patchValue({ password: randomPassword });
  }

  submitForm() { }

}
