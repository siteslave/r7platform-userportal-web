import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugsRoutingModule } from './drugs-routing.module';
import { DrugsComponent } from './drugs.component';
import { NgZorroModule } from '../../ng-zorro.module';


@NgModule({
  declarations: [
    DrugsComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    DrugsRoutingModule
  ]
})
export class DrugsModule { }
