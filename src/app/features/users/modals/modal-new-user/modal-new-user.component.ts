import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-new-user',
  templateUrl: './modal-new-user.component.html',
  styleUrls: ['./modal-new-user.component.css']
})
export class ModalNewUserComponent {

  @Output() onSubmit = new EventEmitter<any>();


  isVisible = false;
  province = '';
  enabled = true;

  constructor () { }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.onSubmit.emit(true);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  randomPassword() { }

  submitForm() { }

}
