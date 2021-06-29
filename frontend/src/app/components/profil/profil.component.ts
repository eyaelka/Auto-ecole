import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  username;
  email


  constructor(
    public http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit() {
   this.authService.getProfile().subscribe((res: any) => {
    this.username = res.user.username;
    this.email = res.user.email;});
  }



}
