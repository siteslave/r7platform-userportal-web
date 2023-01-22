import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzMessageModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzDrawerModule,
    NzDropDownModule,
    NzGridModule,
  ],
  exports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzMessageModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzDrawerModule,
    NzDropDownModule,
    NzGridModule,
  ]
})
export class NgZorroModule { }
