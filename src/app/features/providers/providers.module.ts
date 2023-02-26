import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from '../../ng-zorro.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ProvidersComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ProvidersRoutingModule
  ]
})
export class ProvidersModule { }
