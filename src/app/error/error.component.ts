import {Component, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './error.component.html',
  styleUrls: ['error.component.css']
})
export class ErrorComponent implements AfterViewInit {

  ngAfterViewInit() {

    $(function () {
      $('.preloader').fadeOut();
    });
  }

}
