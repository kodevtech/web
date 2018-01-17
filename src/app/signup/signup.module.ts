import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {AuthService} from '../shared/auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [SignupComponent],
  providers: [
    AuthService
  ],
})
export class SignupModule { }
