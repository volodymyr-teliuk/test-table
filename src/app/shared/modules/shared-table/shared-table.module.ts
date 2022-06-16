import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from './shared-table.component';
import { CdkTableModule } from '@angular/cdk/table';
import { DateModule } from '../date/date.module';
import { DynamicComponent } from './components/dynamic/dynamic.component';


@NgModule({
  declarations: [
    SharedTableComponent,
    DynamicComponent,
  ],
  imports: [
    CommonModule,
    CdkTableModule,
    DateModule,
  ],
  exports: [
    SharedTableComponent,
  ]
})
export class SharedTableModule {}
