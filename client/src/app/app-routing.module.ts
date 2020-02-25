import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: 'heroes',
  loadChildren: () => import('./list/list.module').then(m => m.ListModule)
},
{
  path: 'heroes/:id',
  loadChildren: () => import('./find/find.module').then(m => m.FindModule)
},
{
  path: '',
  redirectTo: 'heroes',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
