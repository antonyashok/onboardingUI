import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridComponent } from './grid/app.grid.component';
import { RegiesterComponent } from './regiester/app.regiester.component';

const routes: Routes = [
    {
      path: '',
      component: GridComponent
    },
    {
    path: 'onboarding/home',
    component: GridComponent
    },
    {
      path: 'onboarding/register',
      component: RegiesterComponent
    },
    {
      path: 'onboarding/register/:id',
      component: RegiesterComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
