import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain = "http://localhost:3000";
  authToken;
  user;
  authorization_header;


  constructor(private http: HttpClient) { }



loadToken() {
  this.authToken = localStorage.getItem('token');; // Get token and asssign to variable to be used elsewhere
}



  // Function to register user accounts
  registerUser(user) {
    return this.http.post(this.domain + '/authentication/sinscrire', user).pipe(map(res => res));
  }

  //Function to check if username is taken
  checkUsername(username) {
    return this.http.get(this.domain + '/authentication/checkUsername/' + username);
  }

  // Function to check if e-mail is taken
  checkEmail(email) {
    return this.http.get(this.domain + '/authentication/checkEmail/' + email);
  }

  login(user) {
    return this.http.post(this.domain + '/authentication/seconnecter', user);
  }

  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }



  storeUserData(token,user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // // Function to get user's profile data
   getProfile() {
   this.authorization_header = { headers: { 'Content-Type': 'application/json','Authorization': localStorage.getItem('token')} };
   return this.http.get(this.domain + '/authentication/profil', this.authorization_header);
}



  isLoggedIn() {

    if (this.user) {
      return true;
    } else {
      return false;
    }
  }



  isloggedinadmin() {
    let mytoken = localStorage.getItem('myToken');
    let helper = new JwtHelperService();
    let decodedToken = helper.decodeToken(mytoken);
    if (mytoken) {
      if (decodedToken.role == 'admin') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}


