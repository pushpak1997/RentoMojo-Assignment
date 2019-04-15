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
  loadedComments: any

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getComment().subscribe( res => {
      console.log("loaded comments are ",res);
      this.loadedComments = res;
    })
  }

  onComment(){
    console.log("comment is ",this.comment);
    if(!this.comment){
      this.flashMessage.show('No Comment ', {cssClass: 'alert-danger', timeout: 2000});
    }
    else if(!this.authService.loggedIn()){
      this.flashMessage.show('Please Login ', {cssClass: 'alert-danger', timeout: 2000});
      this.router.navigate(['/login']);
    }
    else {
      var com = this.comment;
      this.comment = '';
      this.authService.comment(com).subscribe(data => {
        console.log("comment posted ", data);
        this.flashMessage.show('Comment posted successfully', {cssClass: 'alert-success', timeout: 2000});
      })
    }
  }

  upvote(){
    console.log("upvote clicked");
    if(!this.authService.loggedIn()){
      this.flashMessage.show('Please Login ', {cssClass: 'alert-danger', timeout: 2000});
      this.router.navigate(['/login']);
    }
    else{
      console.log("upvote clicked");
    }
  }

  downvote(){
    console.log("downvote clicked");
    if(!this.authService.loggedIn()){
      this.flashMessage.show('Please Login ', {cssClass: 'alert-danger', timeout: 2000});
      this.router.navigate(['/login']);
    }
    else{
      console.log("downvote clicked");
    }
  }

}
