import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './admin/add-products/add-products.component';
import { DeleteUserComponent } from './admin/delete-user/delete-user.component';
import { RemoveProductsComponent } from './admin/remove-products/remove-products.component';
import { UpdateProductsComponent } from './admin/update-products/update-products.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { Err404Component } from './pages/err404/err404.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { RegisterComponent } from './pages/register/register.component';
import { UpdateComponent } from './pages/update/update.component';
//import {SliderComponent} from './pages/slider/slider.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'addProducts', component: AddProductsComponent },
      { path: 'update', component: UpdateComponent },
      { path: 'update/:id', component: UpdateProductsComponent },
      { path: 'delete/:id', component: RemoveProductsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/delete/:id', component: DeleteUserComponent },
    ],
  },
  {
    path: 'cart',
    children: [
      { path: '', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
    ],
  },
  { path: '**', component: Err404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
