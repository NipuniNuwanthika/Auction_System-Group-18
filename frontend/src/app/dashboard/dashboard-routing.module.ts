import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AuthGuardService as AuthGuard } from '../../services/auth-guard.service';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "auth",
        children: [
          {
            path: "",
            loadChildren: './auth/auth.module#AuthModule'
          }
        ]
      },
      {
        path: "seller",
        canActivate: [AuthGuard],
        data: { type: "seller" },
        children: [
          {
            path: "",
            loadChildren: './seller/seller.module#SellerModule'
          }
        ]
      },
      {
        path: "buyer",
        canActivate: [AuthGuard],
        data: { type: "buyer" },
        children: [
          {
            path: "",
            loadChildren: './buyer/buyer.module#BuyerModule'
          }
        ]
      },
      {
        path: "products",
        children: [
          {
            path: "",
            loadChildren: './products/products.module#ProductsModule'
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
