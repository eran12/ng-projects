import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableScattegoriesComponent } from './table-scattegories/table-scattegories.component';

const routes: Routes = [
  {
    path: '',
    component: TableScattegoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule {
}
