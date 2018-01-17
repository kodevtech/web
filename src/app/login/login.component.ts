import { Component, OnInit, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../models/User';
import { Profile } from '../models/Profile';
import { AuthService } from '../shared/auth/auth.service';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  // init
  user = new User('', '', '', false, '', '', '', '');
  type;
  redirectUrl: string;
  msg: string;
  routeType: string;
  token: string;
  profile: Profile;
  newUser = false;

  // End the Closeable Alert
  // This is for the self closing alert
  private _success = new Subject<string>();

  successMessage: string;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
    // this.authService.setView(vcr);

    // Logic for dynamic messages
    this.activatedRoute.queryParams.subscribe(
      (param: Params) => {
        this.redirectUrl = param['redirect'];

        this.token = param['token'];
        if (param.hasOwnProperty('info')) {
          const checkNoPassword = this.token ? this.token.split('_') : [];
          if (checkNoPassword[0] === 'pass' && param['info'] === 'setPassword') {
            this.newUser = true;
            setTimeout(() => {
              $('#loginform').slideUp();
              $('#resetPwdform').fadeIn();
            }, 500);

          } else if (checkNoPassword[0] === 'pass' && param['info'] === 'newPassword') {
            setTimeout(() => {
              $('#loginform').slideUp();
              $('#resetPwdform').fadeIn();
            }, 500);

          } else if (param['info'] === 'verify') {
            // this.routeType = 'success';
            // this.successMessage = 'Your account is successfully verified.';
            this.authService.showSuccess('Your account is successfully verified.');
            setTimeout(() => {
              // this.successMessage = null;
              this.router.navigate(['/login']);
            }, 3000);
          } else if (param['info'] === 'resetSuccess') {
            // this.routeType = 'success';
            // this.successMessage = 'Password changed successfully';
            this.authService.showSuccess('Password changed successfully');
            setTimeout(() => {
              // this.successMessage = null;
              $('#resetPwdform').slideUp();
              $('#loginform').fadeIn();
              this.router.navigate(['/login']);
            }, 3000);
          } else if (param['info'] === 'setSuccess') {
            // this.routeType = 'success';
            // this.successMessage = 'Password changed successfully';
            this.authService.showSuccess('Password updated successfully');
            setTimeout(() => {
              // this.successMessage = null;
              $('#resetPwdform').slideUp();
              $('#loginform').fadeIn();
              this.router.navigate(['/login']);
            }, 3000);
          } else if (param['info'] === 'verification') {
            // this.routeType = 'success';
            // this.successMessage = 'We have sent you a mail with account verification link. Please verify your account.';
            this.authService.showSuccess('We have sent you a mail with account verification link. Please verify your account.');
            setTimeout(() => {
              // this.successMessage = null;
              this.router.navigate(['/login']);
            }, 3000);
          } else if (param['info'] === 'reset') {
            // this.routeType = 'success';
            // this.successMessage = 'We have sent you a mail with password reset link.';
            this.authService.showSuccess('We have sent you a mail with password reset link.');
            setTimeout(() => {
              // this.successMessage = null;
              $('#recoverform').slideUp();
              $('#loginform').fadeIn();
              this.router.navigate(['/login']);
            }, 3000);
          } else if (param['info'] === 'verifyError') {
            // this.routeType = 'danger';
            // this.successMessage = 'Verification link is expired or invalid. Please enter your email below to get new verification link.';
            this.authService.showSuccess('Verification link is expired or invalid. Please enter your email below to get new verification link.');
            setTimeout(() => {
              // this.successMessage = null;
              $('#loginform').slideUp();
              $('#verifyform').fadeIn();
              this.router.navigate(['/login']);
            }, 3000);
          }
        }
      }
    );
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    $(function() {
      $('.preloader').fadeOut();
    });
    $(function() {
      (<any>$('[data-toggle="tooltip"]')).tooltip();
    });
    $('#to-recover').on('click', function() {
      $('#loginform').slideUp();
      $('#recoverform').fadeIn();
    });
    $('#to-reset').on('click', function() {
      $('#recoverform').slideUp();
      $('#loginform').fadeIn();
    });


  }


  // Login
  async onLoggedin() {

    const data = {
      email: this.user.email.toLowerCase(),
      password: this.user.password,
    };
    // console.log(data);

    // service
    this.authService.login(JSON.stringify(data)).subscribe(
      response => {
        // this.msg = '';
        // console.log('response => ', response);
        // if (this.rememberMe) {
        //   localStorage.setItem('remember', '1');
        // }
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('data', JSON.stringify(response.user));

        environment.token = response.token;
        environment.role = response.user.role;
        localStorage.setItem('token', environment.token);
        this.router.navigate(['/']);
      },
      error => {
        console.log('login error => ', error);
        this.authService.showError(error.error);
        // this.type = 'danger';
        // this.msg = error.error;
      });
  }

  onBtnSubmitClick(email: string, type: string) {
    if (email && this.isValidEMail(email)) {
      this.sendLink(email, type);
    } else {
      // this.type = 'danger';
      // this.msg = 'Invalid email';
      this.authService.showWarning('Invalid email');
    }
  }

  isValidEMail(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return !(email !== '' && (email.length <= 5 || !EMAIL_REGEXP.test(email)));
  }

  sendLink(email: string, type: string) {
    const data = {
      email: email,
      type: type
    };
    const redirect = type === 'verify' ? 'verification' : 'reset';
    this.authService.verifyEmail(data).subscribe(
      response => {
        // this.msg = '';
        this.router.navigate(['/login'], { queryParams: { info: redirect } });
      },
      error => {
        if (error.error === 'User is already verified') {
          // this.routeType = 'danger';
          // this.successMessage = error.error;
          this.authService.showWarning(error.error);
          // this.msg = '';
          setTimeout(() => {
            this.successMessage = null;
            $('#loginform').fadeIn();
            $('#verifyform').slideUp();
          }, 5000);
        } else {
          // this.type = 'danger';
          // this.msg = error.error;
          this.authService.showError(error.error);
        }
      }
    );
  }

  onBtnSubmitResetClick(password: string, cpassword: string) {
    if (password === cpassword) {
      const data = {
        token: this.token,
        password: password,
        type: this.newUser ? 'set' : 'reset'
      };

      if ( data.type === 'set') {

        this.authService.setPassword(data).subscribe(
          success => {
            // this.msg = '';
            this.router.navigate(['/login'], { queryParams: { info: 'setSuccess' } });
          },
          error => {
            console.log('http error => ', error);
            // this.type = 'danger';
            // this.msg = error.error;
            this.authService.showError(error.error);
          }
        );
      } else {
        this.authService.changePassword(data).subscribe(
          success => {
            // this.msg = '';
            this.router.navigate(['/login'], { queryParams: { info: 'resetSuccess' } });
          },
          error => {
            console.log('http error => ', error);
            // this.type = 'danger';
            // this.msg = error.error;
            this.authService.showError(error.error);
          }
        );
      }


    } else {
      // this.msg = 'Password mismatch';
      // this.type = 'danger';
      this.authService.showWarning('Password mismatch');
    }
  }

}
