import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { Err404Component } from './pages/err404/err404.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AddProductsComponent } from './admin/add-products/add-products.component';
import { UpdateProductsComponent } from './admin/update-products/update-products.component';
import { UpdateComponent } from './pages/update/update.component';
import { RemoveProductsComponent } from './admin/remove-products/remove-products.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { UsersComponent } from './admin/users/users.component';
import { DeleteUserComponent } from './admin/delete-user/delete-user.component';
import { SliderComponent } from './pages/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProductsComponent,
    Err404Component,
    AdminDashboardComponent,
    AddProductsComponent,
    UpdateProductsComponent,
    UpdateComponent,
    RemoveProductsComponent,
    SingleProductComponent,
    CartComponent,
    CheckoutComponent,
    UsersComponent,
    DeleteUserComponent,
    SliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
