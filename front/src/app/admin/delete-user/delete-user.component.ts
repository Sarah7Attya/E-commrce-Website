import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent implements OnInit {
  id: any;
  constructor(
    private activated: ActivatedRoute,
    private auth: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activated.snapshot.paramMap.get('id');
    this.auth.delUser(this.id).subscribe((res) => {
      this.toaster.success('Success', 'User has been deleted successfully');
      this.router.navigate(['dashboard'])
    }, () => {
      this.toaster.error('Error', 'Removing User Error!')
    });
  }
}
