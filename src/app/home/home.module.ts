import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {SIDEBAR_TOGGLE_DIRECTIVES} from '../shared/sidebar.directive';
import {HeaderComponent} from '../shared/header/header.component';
import {SidebarComponent} from '../shared/sidebar/sidebar.component';
import {BreadcrumbComponent} from '../shared/breadcrumb/breadcrumb.component';

import {AuthService} from '../shared/auth/auth.service';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    BreadcrumbComponent,
    SidebarComponent,
    SIDEBAR_TOGGLE_DIRECTIVES
  ],
  providers: [
    AuthService
  ],
})
export class HomeModule {
}
