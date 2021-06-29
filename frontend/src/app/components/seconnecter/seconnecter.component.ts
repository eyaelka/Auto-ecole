import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';


@Component({
  selector: 'app-seconnecter',
  templateUrl: './seconnecter.component.html',
  styleUrls: ['./seconnecter.component.css']
})
export class SeconnecterComponent implements OnInit {

  messageClass;
  message;
  processing = false;
  form: FormGroup;
  previousUrl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard

  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
  }


  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
  }

  // Functiont to submit form and login user
  onLoginSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    }

    this.authService.login(user).subscribe((data:any) =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.authService.storeUserData(data.token, data.user);
        setTimeout(() => {
          if (this.previousUrl){
            this.router.navigate([this.previousUrl]);
          }else{
            this.router.navigate(['/']);
          }

        },2000);
      }
    });


  }




  ngOnInit() {
   }


}
