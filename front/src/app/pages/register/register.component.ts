import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerModel: any = {
    usergender: null,
  };
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  handleSubmit(reg: NgForm) {
    if (reg.valid) {
      if (this.registerModel.usergender != null)
        this.registerModel.gender = this.registerModel.usergender;
      this.auth.register(this.registerModel).subscribe((res) => {
        this.router.navigateByUrl('')
      });
    }
  }
}
