import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { User } from '../models/User';
import { AuthService } from '../shared/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = new User('', '', '', false, '', '', '', '');
  error = '';
  type;
  redirectUrl: string;
  msg: string;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    $(function() {
      $('.preloader').fadeOut();
    });
  }

  async onSignup() {
    if (!this.user.password || !this.user.email) {
      // this.error = 'Password mismatch';
      // this.type = 'danger';
      this.authService.showWarning('Email and password are required!');
    } else if (this.user.password !== this.user.cpassword) {
      // this.error = 'Password mismatch';
      // this.type = 'danger';
      this.authService.showWarning('Password mismatch');
    } else if (!this.user.terms) {
      // this.error = 'Check agree to all terms';
      // this.type = 'danger';
      this.authService.showError('Check agree to all terms');
    } else {
      const data = {
        email: this.user.email.toLowerCase(),
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        userName: this.user.userName,
        password: this.user.password,
      };
      console.log(data);
      // service
      this.authService.signup(JSON.stringify(data)).subscribe(
        response => {
          // this.error = '';
          console.log('response => ', response);
          this.router.navigate(['/login'], { queryParams: { info: 'verification' } });
        },
        error => {
          console.log('login error => ', error);
          // this.error = error.error;
          // this.type = 'danger';
          this.authService.showError(error.error);
        });
    }
  }
}
