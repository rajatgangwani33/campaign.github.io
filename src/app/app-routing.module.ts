import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeWrapperComponent } from './home/components/home-wrapper.component';


const routes: Routes = [
  { path: '', component: HomeWrapperComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
