import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyRoutingModule } from './verify-routing.module';
import { VerifyComponent } from './verify.component';

import {AuthService} from '../shared/auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    VerifyRoutingModule
  ],
  declarations: [VerifyComponent],
  providers: [
    AuthService
  ],
})
export class VerifyModule { }
