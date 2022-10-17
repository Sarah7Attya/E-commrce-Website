import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products: any = [];
  cartProducts: any = [];
  amountBoolean: boolean = false;
  amount: any = 1;
  constructor(private auth: AuthService, private toaster: ToastrService) {
    auth.getAllproducts().subscribe((res) => {
      this.products = res.data;
    });
    
  }

  ngOnInit(): void {}

  addToCart(item: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      const dupItem = this.cartProducts.find(
        (productItem: any) => productItem.item._id == item._id
      );
      if (dupItem) {
        // alert('This product is already added in your cart');
        this.toaster.error('This item is already added!', 'Add to Cart Error', {
          timeOut: 3000,
        });
        this.amountBoolean = false;
      } else {
        this.cartProducts.push({
          item,
          amount: this.amount,
        });
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        this.amountBoolean = false;
        this.toaster.success('The item has been added Successfully.', 'Success')
      }
    } else {
      this.cartProducts = [{ item, amount: this.amount }];
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.amountBoolean = false;
    }
  }
}
