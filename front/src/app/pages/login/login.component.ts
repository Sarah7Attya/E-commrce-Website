import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  isSubmitted: boolean = false;
  NG:any = 'API'
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    let token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {}

  get userData() {
    return this.loginForm.controls;
  }

  handleLogin() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe((res) => {
        if (!res.data.user.isAdmin) {
          this.router.navigate(['']);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('login', 'true');
          localStorage.setItem('id', res.data.user._id);
          this.auth.isLogin = true;
          this.toastr.success(
            `You logged in successfully, ${res.data.user.name}`,
            'Success'
          );
        } else {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('login', 'true');
          localStorage.setItem('type', 'admin');
          localStorage.setItem('id', res.data.user._id);
          this.auth.isLogin = true;
          this.toastr.success(
            `You logged in successfully, ${res.data.user.name}`,
            'Success'
          );          
          location.reload();
          this.router.navigate(['dashboard']);
        }
      });
    }
  }
}
