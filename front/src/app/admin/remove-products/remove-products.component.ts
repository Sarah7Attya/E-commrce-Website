import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-remove-products',
  templateUrl: './remove-products.component.html',
  styleUrls: ['./remove-products.component.css'],
})
export class RemoveProductsComponent implements OnInit {
  id: any;

  constructor(private activated: ActivatedRoute, private auth: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.id = this.activated.snapshot.paramMap.get('id');
    this.auth.deleteProducts(this.id).subscribe((res) => {
      this.router.navigate(['dashboard'])
    });
  }

}
