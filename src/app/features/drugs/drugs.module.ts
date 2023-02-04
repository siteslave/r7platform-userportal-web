import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugsRoutingModule } from './drugs-routing.module';
import { DrugsComponent } from './drugs.component';
import { NgZorroModule } from '../../ng-zorro.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DrugsComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    SharedModule,
    DrugsRoutingModule,
  ]
})
export class DrugsModule { }
