import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  comment: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onComment(){
    console.log("comment is ",this.comment);
    var com = this.comment;
    this.comment = '';
    this.authService.comment(com).subscribe( data => {
      console.log("comment posted ",data);
      this.flashMessage.show('Comment posted successfully', {cssClass: 'alert-success', timeout: 5000});
    })

  }
}
