import { Component, OnInit} from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User = {} as User;
  errMsg: string;

  constructor(private service: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.user.Username = localStorage.getItem('username');
    this.user.Role = localStorage.getItem('role');
    this.user.Email = localStorage.getItem('email');
    this.user.Mobile = localStorage.getItem('mobilephone');
    this.user.Confirmed = 'Yes';
    this.user.UserId = parseInt(localStorage.getItem('Id'));
    this.user.Password = '0';
  };

  updateProfile(user: User){
    this.service.updateProfile(user).subscribe(data => {
      this.router.navigateByUrl('');
      }, err => {
        this.errMsg =
        (err.error.text) ?
        err.error.text :
        (err.error.error.message) ?
        `${err.status} - ${err.error.error.message}` :
        (err.status) ?
        `${err.status} - ${err.statusText}` :
        'Server error';
      });
  }

  public resetForm(){
    this.errMsg = '';
    this.user = ({} as User);
    this.router.navigateByUrl('');
  }

}
