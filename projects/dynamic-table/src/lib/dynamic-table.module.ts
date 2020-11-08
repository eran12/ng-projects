import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicTableComponent } from './dynamic-table.component';



@NgModule({
  declarations: [DynamicTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [DynamicTableComponent]
})
export class DynamicTableModule { }
