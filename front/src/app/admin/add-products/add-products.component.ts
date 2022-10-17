import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  imgFile: any = null;
  isSubmitted: boolean = false;
  addProducts = new FormGroup({
    title: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    categories: new FormControl('', [Validators.required]),
    size: new FormControl(''),
    price: new FormControl('', [Validators.required]),
    productImg: new FormControl('', [Validators.required])
  });
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  get productData() {
    return this.addProducts.controls;
  }

  handleImg(e: any) {
    this.imgFile = e.target.files;
    console.log(this.imgFile);
  }

  handleAddProducts() {
    this.isSubmitted = true;
    if (this.imgFile != null) {
      let formData = new FormData();
      formData.append('title', this.addProducts.controls['title'].value);
      formData.append('desc', this.addProducts.controls['desc'].value);
      formData.append(
        'categories',
        this.addProducts.controls['categories'].value
      );
      formData.append(
        'size',
        this.addProducts.controls['size'].value
      );
      formData.append('price', this.addProducts.controls['price'].value);
      formData.append('productImg', this.imgFile[0]);
      this.auth.addProducts(formData).subscribe((res) => {
        console.log(res);
        this.router.navigate(['dashboard']);
      });
    }
  }
}
