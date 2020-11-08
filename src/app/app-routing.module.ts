import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableScattegoriesComponent } from './modules/table/table-scattegories/table-scattegories.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TableScattegoriesComponent,
    redirectTo: ''
  },
  {
    path: 'tables',
    loadChildren: () => import('./modules/table/table.module').then(m => m.TableModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
