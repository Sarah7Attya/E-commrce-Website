import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  products:any
  constructor(private auth: AuthService) {
    this.auth.getAllproducts().subscribe(res => {
      this.products = res.data
    })
  }

  ngOnInit(): void {
  }

}
