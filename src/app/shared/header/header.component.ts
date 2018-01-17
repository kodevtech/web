import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Info } from '../../models/Profile';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements AfterViewInit {
  name: string;
  showHide: boolean;
  info: Info;
  // imagePath = environment.public_end_point;

  constructor(private router: Router, private authService: AuthService) {
    this.showHide = true;


    this.authService.userIfnoChangeEvent.subscribe(
      info => {
        console.log(info);
        this.info = info;
        this.info.imagePath = this.info.imagePath;
        console.log(this.info);
      }
    );
  }

  changeShowStatus() {
    this.showHide = !this.showHide;
  }

  ngAfterViewInit() {
    $(function() {
      $('.preloader').fadeOut();
    });

    this.transform(document);

    var set = function() {
      var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
      var topOffset = 70;
      if (width < 1170) {
        $('body').addClass('mini-sidebar');
        $('.navbar-brand span').hide();
        $('.scroll-sidebar, .slimScrollDiv').css('overflow-x', 'visible').parent().css('overflow', 'visible');
        $('.sidebartoggler i').addClass('ti-menu');
      } else {
        $('body').removeClass('mini-sidebar');
        $('.navbar-brand span').show();
        //$(".sidebartoggler i").removeClass("ti-menu");
      }

      var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
      height = height - topOffset;
      if (height < 1) height = 1;
      if (height > topOffset) {
        $('.page-wrapper').css('min-height', (height + 14) + 'px'); //Footer fix
      }

    };
    $(window).ready(set);
    $(window).on('resize', set);

    $(document).on('click', '.mega-dropdown', function(e) {
      e.stopPropagation();
    });

    $('.search-box a, .search-box .app-search .srh-btn').on('click', function() {
      $('.app-search').toggle(200);
    });

    (<any>$('[data-toggle="tooltip"]')).tooltip();

    (<any>$('.scroll-sidebar')).slimScroll({
      position: 'left',
      size: '5px',
      height: '100%',
      color: '#dcdcdc'
    });

    (<any>$('.right-sidebar')).slimScroll({
      height: '100%',
      position: 'right',
      size: '5px',
      color: '#dcdcdc'
    });

    (<any>$('.message-center')).slimScroll({
      position: 'right',
      size: '5px',
      color: '#dcdcdc'
    });

    $('body').trigger('resize');

  }

  // JS code for avatar

  letterAvatar(name, size) {
    let w = window;
    let d = document;
    name = name || '';
    size = size || 60;

    let colours = [
      "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7",
      "#1abc9c", "#2ecc71", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#8e44ad", "#2c3e50"
    ],

      nameSplit = String(name).toUpperCase().split(' '),
      initials, charIndex, colourIndex, canvas, context, dataURI;


    if (nameSplit.length == 1) {
      initials = nameSplit[0] ? nameSplit[0].charAt(0) : '?';
    } else {
      initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
    }

    if (w.devicePixelRatio) {
      size = (size * w.devicePixelRatio);
    }

    charIndex = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
    colourIndex = charIndex % 20;
    canvas = d.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    context = canvas.getContext("2d");

    context.fillStyle = colours[colourIndex - 1];
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = Math.round(canvas.width / 2) + "px Arial";
    context.textAlign = "center";
    context.fillStyle = "#FFF";
    context.fillText(initials, size / 2, size / 1.5);

    dataURI = canvas.toDataURL();
    canvas = null;

    return dataURI;
  }

  transform = function(d) {
    let that = this;
    Array.prototype.forEach.call(d.querySelectorAll('img[avatar]'), function(img, name) {
      name = img.getAttribute('src');
      img.src = that.letterAvatar(name, img.getAttribute('width'));
      img.removeAttribute('avatar');
      img.setAttribute('alt', name);
    });
  };

  logoutUser() {
    this.authService.logout();
    window.location.href = '';
    // this.router.navigate(['/login']);
  }
}
