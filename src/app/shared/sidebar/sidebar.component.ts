import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Info } from '../../models/Profile';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements AfterViewInit {
  // this is for the open close
  isActive: boolean = true;
  showMenu: string = '';
  showSubMenu: string = '';
  info: Info;
  role = environment.role;
  addExpandClass(element: any) {

    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(private router: Router, private authService: AuthService) {
    this.authService.userIfnoChangeEvent.subscribe(
      info => {
        // console.log(this.role);
        this.info = info;
      }
    );
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  eventCalled() {
    this.isActive = !this.isActive;

  }

  ngAfterViewInit() {
    $(function() {

      $('.sidebartoggler').on('click', function() {
        if ($('body').hasClass('mini-sidebar')) {
          $('body').trigger('resize');
          $('.scroll-sidebar, .slimScrollDiv').css('overflow', 'hidden').parent().css('overflow', 'visible');
          $('body').removeClass('mini-sidebar');
          $('.navbar-brand span').show();
          // $(".sidebartoggler i").addClass("ti-menu");
        }
        else {
          $('body').trigger('resize');
          $('.scroll-sidebar, .slimScrollDiv').css('overflow-x', 'visible').parent().css('overflow', 'visible');
          $('body').addClass('mini-sidebar');
          $('.navbar-brand span').hide();
          // $(".sidebartoggler i").removeClass("ti-menu");
        }
      });


    });
  }

  logoutUser() {
    this.authService.logout();
    window.location.href = '';
    // this.router.navigate(['/login']);
  }


}
