import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { ToastrModule } from 'ngx-toastr';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from './shared/auth/auth.service';
import { environment } from '../environments/environment';

import { ImageUploadModule } from "angular2-image-upload";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ImageUploadModule.forRoot(),
  ],
  providers: [AuthGuard, AuthService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private authService: AuthService) {
    if (this.authService.isLoggedIn()) {
      environment.token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
      environment.role = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')).role : '';
      console.log(environment.role);
    }
  }
}
