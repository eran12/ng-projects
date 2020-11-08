import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicTableModule } from 'dynamic-table';

import { TableRoutingModule } from './table-routing.module';
import { TableScattegoriesComponent } from './table-scattegories/table-scattegories.component';
import { TableUnModuledComponent } from './table-un-moduled/table-un-moduled.component';

@NgModule({
  declarations: [
    TableScattegoriesComponent,
    TableUnModuledComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    DynamicTableModule
  ]
})
export class TableModule {
}
