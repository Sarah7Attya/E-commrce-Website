import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users:any
  constructor(private auth: AuthService) {
    this.auth.getUsers().subscribe(res => {
      this.users = res.data
    })
  }

  ngOnInit(): void {
  }

}
