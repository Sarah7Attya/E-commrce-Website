import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  userProducts: any = [];
  total: any = 0;
  newAmount: any;
  constructor(private auth: AuthService, private router: Router, private toaster: ToastrService) {
    if ('cart' in localStorage) {
      this.userProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.totalPrice();
  }

  ngOnInit(): void {}
  getNewAmount(event: any) {
    this.newAmount = event.target.value;
    console.log(this.newAmount);
  }

  totalPrice() {
    this.total = 0;
    for (const i in this.userProducts) {
      this.total +=
        this.userProducts[i].item.price * this.userProducts[i].amount;
    }
  }

  deleteProduct(i: number) {
    this.userProducts.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(this.userProducts));
  }

  checkout() {
    const products = this.userProducts.map((product: any) => {
      return {
        productId: product.item._id,
        quantity: product.amount,
      };
    });

    const cartModel: any = {
      userId: localStorage.getItem('id'),
      products,
    };
    this.auth.createCart(cartModel).subscribe(
      (res) => {
        this.router.navigate(['cart/checkout']);
         this.toaster.success(
           `Cart has been added successfully`,
           'Success'
         ); 
      },
      () => {
        this.toaster.error('Please check your info again', 'Cart Error');
      }
    );
  }
}
