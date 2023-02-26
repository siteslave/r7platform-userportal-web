import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesRoutingModule } from './insurances-routing.module';
import { InsurancesComponent } from './insurances.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from '../../ng-zorro.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    InsurancesComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InsurancesRoutingModule
  ]
})
export class InsurancesModule { }
