import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  authToken: any;
  isDev: any;
  user: any;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
      this.isDev = true;  // Change to false before deployment
      }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/register', user, {headers: headers})
      .map(res => res);
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/authenticate', user, {headers: headers})
      .map(res => res);
  }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/users/profile', {headers: headers})
      .map(res => res);
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUser() {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  }

  loggedIn() {
    // console.log("logged in jwt helper ",this.jwtHelper.isTokenExpired());
    // return !this.jwtHelper.isTokenExpired();
    if(localStorage.getItem('user')) return true;
    else return false;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    console.log("logged in jwt helper logout ",this.jwtHelper.isTokenExpired());

  }

  comment(com){
    let user = this.loadUser();
    var newComment = {
      text: com,
      author: {
        id: user.id,
        username: user.username
      }
    };
    console.log("comment service called ",user);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/comments/', newComment, {headers: headers})
      .map(res => res);
  }

  commentupvote(com){
    let user = this.loadUser();
    var userid=user.id;
    var comid=com._id;
    console.log("printing userid ",userid);
    console.log("printing commentid ",comid);
    var newbody = {
      id: userid
    };
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    var upvoteurl='/comments/upvote/'+comid;
    return this.http.put('/comments/upvote/'+comid, newbody, {headers: headers})
      .map(res => res);
  }
  commentdownvote(com){
    let user = this.loadUser();
    var userid=user.id;
    var comid=com._id;
    console.log("printing userid ",userid);
    console.log("printing commentid ",comid);
    var newbody = {
      id: userid
    };
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // var downvoteurl='http://localhost:3000/comments/downvote/'+comid;
    return this.http.put('/comments/downvote/'+comid, newbody, {headers: headers})
      .map(res => res);
  }
  getComment(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('/comments/', {headers: headers})
      .map(res => res);
  }
}
