import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'src/app/Services/account.service';
import { LoginUser } from 'src/app/Models/loginUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: LoginUser = {
    Username: '',
    Password: ''
  };
  errMsg: string;
  constructor(private service: AccountService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token){
      this.router.navigateByUrl('login');
      return;
    }
  }

  login(){
    this.service.authenticate(this.user).subscribe(
      next => {
        this.router.navigateByUrl('');
      },
      err => {
        this.errMsg =
        (err.error.text) ?
        err.error.text :
        (err.error.error.message) ?
        `${err.status} - ${err.error.error.message}` :
        (err.status) ?
        `${err.status} - ${err.statusText}` :
        'Server error';
      }
    );
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  isUser(){
    const role = localStorage.getItem('role');
    return (role === 'User');
  }

  isAdmin(){
    const role = localStorage.getItem('role');
    return (role === 'Admin');
  }

  name(){
    const username = localStorage.getItem('username');
    return username;
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

}
