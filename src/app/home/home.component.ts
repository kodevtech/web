import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Info } from '../models/Profile'
import { AuthService } from '../shared/auth/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  profileInfo: Info;
  imagePath = environment.public_end_point;

  constructor(public router: Router, private authService: AuthService) {
    if (this.router.url === '/') {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    //fetch from local
    this.profileInfo = JSON.parse(localStorage.getItem('data'));
    this.profileInfo.displayName = this.profileInfo.firstName || this.profileInfo.lastName ? this.profileInfo.firstName + ' ' + this.profileInfo.lastName : this.profileInfo.userName ? this.profileInfo.userName : 'Bunlong';
    this.profileInfo.imagePath = this.profileInfo.imagePath ?  this.imagePath + this.profileInfo.imagePath : null;
    console.log(this.profileInfo.imagePath);
    this.authService.profileDetails = this.profileInfo;
    // this.router.navigate(['/dashboard']);
  }
}
