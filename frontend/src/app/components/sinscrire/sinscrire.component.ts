import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sinscrire',
  templateUrl: './sinscrire.component.html',
  styleUrls: ['./sinscrire.component.css']
})
export class SinscrireComponent implements OnInit {
  form: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.createForm();
   }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        this.validateUsername
      ])],
      birth: ['', Validators.compose([
        Validators.required,
        this.validateBirth

      ])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        this.validatePhone
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      confirm: ['', Validators.required]
    },
    { validator: this.matchingPasswords('password', 'confirm') })
}

 // Function to disable the registration form
 disableForm() {
  this.form.controls['username'].disable();
  this.form.controls['birth'].disable();
  this.form.controls['email'].disable();
  this.form.controls['password'].disable();
  this.form.controls['confirm'].disable();
  this.form.controls['phone'].disable();
}

// Function to enable the registration form
enableForm() {
  this.form.controls['username'].enable();
  this.form.controls['birth'].enable();
  this.form.controls['email'].enable();
  this.form.controls['password'].enable();
  this.form.controls['confirm'].enable();
  this.form.controls['phone'].enable();
}





 validateEmail(controls) {
  // regular expression
  const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if (regExp.test(controls.value)) {
    return null;
  } else {
    return { 'validateEmail': true }
  }
}


validateUsername(controls) {
  const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
  if (regExp.test(controls.value)) {
    return null;
  } else {
    return { 'validateUsername': true }
  }
}


validatePassword(controls) {
  const regExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,35}$/);
  if (regExp.test(controls.value)) {
    return null;
  } else {
    return { 'validatePassword': true }
  }
}


matchingPasswords(password, confirm) {
  return (group: FormGroup) => {
    if (group.controls[password].value === group.controls[confirm].value) {
      return null;
    } else {
      return { 'matchingPasswords': true }
    }
  }
}



validatePhone(controls) {
  // regular expression
  const regExp = new RegExp(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/);
  if (regExp.test(controls.value)) {
    return null;
  } else {
    return { 'validatePhone': true }
  }
}

validateBirth(controls){
  return{ 'validateBirth':true}
}


  onRegisterSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      username: this.form.get('username').value,
      birth: this.form.get('birth').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      phone: this.form.get('phone').value
    }
    this.authService.registerUser(user).subscribe((data : any) => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/seconnecter'])
        },2000)
      }
    })

  }



  checkEmail() {
    this.authService.checkEmail(this.form.get('email').value).subscribe((data : any) => {

      if (!data.success) {
        this.emailValid = false;
        this.emailMessage = data.message;
      } else {
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    });
  }


  checkUsername() {
    this.authService.checkUsername(this.form.get('username').value).subscribe((data : any) => {
      if (!data.success) {
        this.usernameValid = false;
        this.usernameMessage = data.message;

      } else {
        this.usernameValid = true;
        this.usernameMessage = data.message;

      }
    });
  }

  ngOnInit() {
  }

}
