import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };
    this.authService.authenticateUser(user).subscribe((data)=>{
        console.log("data my",data);
        if(data['success']) {
          console.log("if data my ",data);
          this.authService.storeUserData(data['token'], data['user']);
          this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['/']);
      } else {
          this.flashMessage.show(data['msg'], {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['/login']);
      }
    });
  }

}
