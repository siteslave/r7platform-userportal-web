import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalsRoutingModule } from './hospitals-routing.module';
import { HospitalsComponent } from './hospitals.component';
import { NgZorroModule } from '../../ng-zorro.module';


@NgModule({
  declarations: [
    HospitalsComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    HospitalsRoutingModule
  ]
})
export class HospitalsModule { }
