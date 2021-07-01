import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: SellerDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
