import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../shared/auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    NgbModule.forRoot(),
  ],
  declarations: [LoginComponent],
  providers: [
    AuthService
  ],
})
export class LoginModule {
}
