import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navLogin: any;
  constructor(
    public auth: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      auth.isLogin = true;
    }
    const login = localStorage.getItem('login');
    if (login) this.navLogin = true;
  }

  ngOnInit(): void {}
  
  handleLogout() {
    this.auth.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('login');
    localStorage.removeItem('id');
    this.auth.isLogin = false;
    this.toaster.success('You logged out successfully', 'GoodBye!');
    this.router.navigate(['']);
    location.reload()
  }
}
