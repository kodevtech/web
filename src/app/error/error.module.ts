import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ErrorComponent} from './error.component';
import {ErrorRoutingModule} from './error-routing.module';

@NgModule({
  imports: [
    ErrorRoutingModule,
    RouterModule
  ],
  declarations: [ErrorComponent]
})
export class ErrorModule {
}
