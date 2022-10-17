import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('type');

    if (!token || !admin) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {}
  handleAddProducts() {
    this.router.navigate(['/dashboard/addProducts'])
  }
}
