import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  token: string;
  errorMsg: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {

  }

  ngOnInit() {

    $(function () {
      $('.preloader').fadeOut();
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.activatedRoute.queryParams.subscribe(
      param => {
        this.token = param['token'];
        const data = {
          token: this.token,
          type: 'verify'
        };
        this.authService.verifyToken(data).subscribe(
          success => {
            this.router.navigate(['/login'], {queryParams: {info: 'verify'}});
          },
          error => {
            console.log('http error => ', error);
            this.router.navigate(['/login'], {queryParams: {info: 'verifyError'}});
          }
        );
      }
    );
  }
}


