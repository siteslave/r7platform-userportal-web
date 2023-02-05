import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabsRoutingModule } from './labs-routing.module';
import { LabsComponent } from './labs.component';


@NgModule({
  declarations: [
    LabsComponent
  ],
  imports: [
    CommonModule,
    LabsRoutingModule
  ]
})
export class LabsModule { }
