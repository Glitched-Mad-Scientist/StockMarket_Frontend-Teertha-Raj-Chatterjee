import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { User } from 'src/app/Models/user';
import { NgForm} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  user:User;
  istaken:boolean = false;
  locked:boolean = true;
  @ViewChild('signupForm') form:NgForm;
  errMsg:string;

  constructor(private service:AccountService) { }

  ngOnInit(): void {
    this.user = {
      Username:'',
      Password:'',
      Email:'',
      Mobile:''
    }
    this.errMsg = "";
  }

  onSubmit(){
    if(this.isTaken(), this.istaken){
      this.errMsg = "Username already taken";
    }
    this.service
      .register(this.form.value)
      .subscribe(response => {
        console.log(response);
        this.resetForm();
        //navigate to home
      }, err => {
        this.errMsg = 
          (err.error.text) ? 
            err.error.text : 
            err.error.error.message ? 
                `${err.status} - ${err.error.error.message}` : 
                err.status?
                `${err.status} - ${err.statusText}` : 
                'Server error';
      });
  }

  public isTaken():void{
    if(this.user.Username.length<3) this.istaken = false;
    else this.service.isTaken(this.user.Username)
      .subscribe(taken=>{
        this.istaken =  (taken === true);
      }, err=>{
        this.istaken = false;   //Can't check.
      });
  }

  public resetForm(){
    this.errMsg = "";
  }
}
