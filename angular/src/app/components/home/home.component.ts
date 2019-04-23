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
  loadedComments: any;
  upvotes: any;
  downvotes: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {
    this.authService.getComment().subscribe( res => {
      console.log("loaded comments are ",res);
      this.loadedComments = res;
    });
  }

  ngOnInit() {
    this.authService.getComment().subscribe( res => {
      console.log("loaded comments are ",res);
      this.loadedComments = res;
    });
  }

  onComment(){
    console.log("comment is ",this.comment);
    if(!this.comment){
      this.flashMessage.show('No Comment ', {cssClass: 'alert-danger position-fixed ', timeout: 2000});
    }
    else if(!this.authService.loggedIn()){
      this.flashMessage.show('Please Login ', {cssClass: 'alert-danger ', timeout: 2000});
      this.router.navigate(['/login']);
    }
    else {
      var com = this.comment;
      this.comment = '';
      this.authService.comment(com).subscribe(data => {
        console.log("comment posted ", data);
        //console.log("com",com);
        this.loadedComments.push(data);
        this.flashMessage.show('Comment posted successfully ', {cssClass: 'alert-success position-fixed', timeout: 2000});
      })
    }
  }

  upvote(comment){
    console.log("upvote clicked",comment);
    if(!this.authService.loggedIn()){
      this.flashMessage.show('Please Login ', {cssClass: 'alert-danger ', timeout: 2000});
      this.router.navigate(['/login']);
    }
    else{
      console.log("upvote clicked2");
      let user = this.authService.loadUser();
      var userid=user.id;
      if(comment.author.id==userid){
        this.flashMessage.show('You cant upvote your own comment', {cssClass: 'alert-warning position-fixed', timeout: 2000});

      }
      else if(comment.downvote.includes(userid)){
        console.log("upvotes or downvotes contain already ");
        this.flashMessage.show('You have already downvoted', {cssClass: 'alert-warning position-fixed', timeout: 2000});
        // doc.upvote.push(user_id);
      }
      else if(comment.upvote.includes(userid)){
        console.log("upvotes or downvotes contain already ");
        this.flashMessage.show('You have already upvoted ', {cssClass: 'alert-warning position-fixed', timeout: 2000});
        // doc.upvote.push(user_id);
      }
      else {
        this.authService.commentupvote(comment).subscribe(data => {
          console.log("comment upvoted ", data);
          comment.upvote.push(userid);
          this.flashMessage.show('Comment upvoted successfully ', {cssClass: 'alert-success position-fixed', timeout: 2000});
          //this.router.navigate(['/']);
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
      if(comment.author.id==userid){
        this.flashMessage.show('You cant downvote your own comment', {cssClass: 'alert-warning position-fixed', timeout: 2000});

      }
      else if(comment.upvote.includes(userid)){
        console.log("upvotes or downvotes contain already ");
        this.flashMessage.show('You have already upvoted', {cssClass: 'alert-warning position-fixed', timeout: 2000});
        // doc.upvote.push(user_id);
      }
      else if(comment.downvote.includes(userid)){
        console.log("upvotes or downvotes contain already ");
        this.flashMessage.show('You have already downvoted', {cssClass: 'alert-warning position-fixed', timeout: 2000});
        // doc.upvote.push(user_id);
      }
      else {
        this.authService.commentdownvote(comment).subscribe(data => {
          console.log("comment downvoted ", data);
          comment.downvote.push(userid)
          this.flashMessage.show('Comment downvoted successfully', {cssClass: 'alert-success position-fixed', timeout: 2000});
          // this.router.navigate(['/']);
        })
      }

    }
  }

}
