import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  domain = "http://localhost:3000";
  authorization_header;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  // createAuthenticationHeaders(){
  //   this.authorization_header = { headers: { 'Content-Type': 'application/json','Authorization': this.authService.authToken} };

  // };


  addPost (post) {
    this.authService.loadToken();
    console.log(this.authService.authToken );
    //this.createAuthenticationHeaders();
    this.authorization_header = { headers: { 'Content-Type': 'application/json','Authorization': this.authService.authToken} };
    return this.http.post(this.domain + '/forum/newPost',post, this.authorization_header);
 }

 getAllPosts() {
  this.authorization_header = { headers: { 'Content-Type': 'application/json','Authorization': localStorage.getItem('token')} };
  //this.createAuthenticationHeaders();
  return this.http.get(this.domain + '/forum/allPosts', this.authorization_header);
}

postComment(id, comment) {
  //this.createAuthenticationHeaders(); // Create headers
  // Create blogData to pass to backend
  this.authorization_header = { headers: { 'Content-Type': 'application/json','Authorization': localStorage.getItem('token')} };
  return this.http.post(this.domain + '/forum/comment', {id: id, comment: comment}, this.authorization_header);

}





}
