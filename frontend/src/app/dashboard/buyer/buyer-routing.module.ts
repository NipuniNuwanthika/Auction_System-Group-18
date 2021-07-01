import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerDashboardComponent } from './buyer-dashboard/buyer-dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: BuyerDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
