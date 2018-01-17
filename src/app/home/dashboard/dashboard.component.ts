import {Component, AfterViewInit} from '@angular/core';
import {AuthService} from '../../shared/auth/auth.service';
import {Info} from '../../models/Profile';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  profile: any;
  info: Info;

  constructor(private authService: AuthService) {
    // Need to check

    // this.authService.userIfnoChangeEvent.subscribe(
    //   info => {
    //     console.log(info);
    //     this.info = info;
    //     this.subtitle = this.info.displayName;
    //     console.log(this.subtitle);
    //   }
    // );


    let data = JSON.parse(localStorage.getItem('data'));
    this.subtitle = 'Welcom '+data.firstName +' '+data.lastName;
  }

  ngAfterViewInit() {
    this.authService.userInfo().subscribe(
      response => {
        console.log('response dashboard=> ', response);
        localStorage.setItem('data', JSON.stringify(response));
        this.authService.profileDetails = response;
      },
      error => {
        console.log('info error => ', error);
      });

  }
}
