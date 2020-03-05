import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
   path: 'materials',
   children: [
    {
      path: '',
      loadChildren: './materials/materials.module#MaterialsPageModule'
    },
    {
      path: 'detail/:materialId',
      loadChildren: './material-detail/material-detail.module#MaterialDetailPageModule'
    },
    {
      path: 'edit/:materialId',
      loadChildren: './material-edit/material-edit.module#MaterialEditPageModule'
    }
   ]
 },
 {
   path: '',
   redirectTo: '/materials',
   pathMatch: 'full'
 }
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
