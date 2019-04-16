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
        this.flashMessage.show('Comment postd successfully', {cssClass: 'alert-success', timeout: 2000});
      })
    }
  }

  upvote(comment){
    console.log("upvote clicked",comment);
    if(!this.authService.loggedIn()){
      this.flashMessage.show('Please Login ', {cssClass: 'alert-danger', timeout: 2000});
      this.router.navigate(['/login']);
    }
    else{
      console.log("upvote clicked2");
      let user = this.authService.loadUser();
      var userid=user.id;
      if(comment.upvote.includes(userid)){

        console.log("upvotes contain already ");
        this.flashMessage.show('You have already upvoted', {cssClass: 'alert-warning', timeout: 2000});

        // doc.upvote.push(user_id);
      }
      else {
        this.authService.commentupvote(comment).subscribe(data => {
          console.log("comment upvoted ", data);
          this.flashMessage.show('Comment upvoted successfully', {cssClass: 'alert-success', timeout: 2000});
        })
      }

    }
  }

  downvote(comment){
    console.log("downvote clicked",comment);
    if(!this.authService.loggedIn()){
      this.flashMessage.show('Please Login ', {cssClass: 'alert-danger', timeout: 2000});
      this.router.navigate(['/login']);
    }
    else{
      console.log("downvote clicked2");
      let user = this.authService.loadUser();
      var userid=user.id;
      if(comment.downvote.includes(userid)){

        console.log("downvotes contain already ");
        this.flashMessage.show('You have already downvoted', {cssClass: 'alert-warning', timeout: 2000});

        // doc.upvote.push(user_id);
      }
      else {
        this.authService.commentdownvote(comment).subscribe(data => {
          console.log("comment downvoted ", data);
          this.flashMessage.show('Comment downvoted successfully', {cssClass: 'alert-success', timeout: 2000});
        })
      }

    }
  }

}
