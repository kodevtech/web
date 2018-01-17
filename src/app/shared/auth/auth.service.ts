import { Injectable, EventEmitter, Output } from '@angular/core';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../environments/environment';
import { Info } from '../../models/Profile';

@Injectable()
export class AuthService {

  private _userInfo: Info;

  // User Info
  get profileDetails() {
    return this._userInfo;
  }
  set profileDetails(value: Info) {
    this._userInfo = value;
    // console.log(this._userInfo);
    this.userIfnoChangeEvent.emit(this._userInfo);
  }

  userIfnoChangeEvent: EventEmitter<Info> = new EventEmitter<Info>();

  constructor(private http: Http, private toastr: ToastrService) {
  }
  // common methods for toaster
  // setView(vcr){
  //   this.toastr.setRootViewContainerRef(vcr);
  // }

  showSuccess(msg) {
    this.toastr.success(msg, 'Success!');
  }

  showWarning(msg) {
    this.toastr.warning(msg, 'Warning!');
  }

  showError(msg) {
    this.toastr.error(msg, 'Error!');
  }


  getToken(): string {
    return environment.token;
  }

  getHeaders(): Headers {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    if (this.getToken()) {
      headers.append('Authorization', 'Bearer ' + (this.getToken()));
    }
    return headers;
  }

  isLoggedIn(): boolean {
    let login: boolean;
    if (environment.token && environment.token.length) {
      login = true;
    } else if (localStorage.getItem('token') && localStorage.getItem('token').length) {
      login = true;
    }
    console.log('isLogin', login);
    return login;
  }

  login(data: string): Observable<any> {
    return this.http.post(environment.api_end_point + 'login', data, { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  signup(data: string): Observable<any> {
    return this.http.post(environment.api_end_point + 'user', data, { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  verifyToken(data: any): Observable<any> {
    return this.http.post(environment.api_end_point + 'verify', data)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  verifyEmail(data: any) {
    return this.http.post(environment.api_end_point + 'getToken', data)
      .map(res => res.json())
      .catch(error => Observable.throw(error.json()));
  }

  changePassword(data) {
    return this.http.post(environment.api_end_point + 'reset', data)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  setPassword(data) {
    return this.http.post(environment.api_end_point + 'set', data)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  userInfo() {
    return this.http.get(environment.auth_end_point + 'info', { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  userUpdate(data: any): Observable<any> {
    return this.http.post(environment.auth_end_point + 'profile', data, { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  unlinkUpload(data) {
    return this.http.post(environment.auth_end_point + 'removeUpload', data, { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  /* Companies */

  getCompanies() {
    return this.http.get(environment.auth_end_point + 'companies', { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  getCompany(id) {
    return this.http.get(environment.auth_end_point + 'company/' + id, { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  getCompanyUser(id) {
    return this.http.get(environment.auth_end_point + 'companyUser/' + id, { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  createCompany(data: any): Observable<any> {
    return this.http.post(environment.auth_end_point + 'company', data, { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  createCompanyUser(data: string): Observable<any> {
    return this.http.post(environment.auth_end_point + 'user', data, { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  updateCompany(data: any): Observable<any> {
    return this.http.put(environment.auth_end_point + 'company', data, { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }



  deleteCompany(data: any): Observable<any> {
    const options = new RequestOptions({
      headers: this.getHeaders(),
      body: data
    });

    return this.http.delete(environment.auth_end_point + 'company', options)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  /* Permissions */

  getPermissions() {
    return this.http.get(environment.auth_end_point + 'permissions', { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  getPermission(id) {
    return this.http.get(environment.auth_end_point + 'permission/' + id, { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  createPermission(data: any): Observable<any> {
    return this.http.post(environment.auth_end_point + 'permission', data, { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  updatePermission(data: any): Observable<any> {
    return this.http.put(environment.auth_end_point + 'permission', data, { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  deletePermission(data: any): Observable<any> {
    const options = new RequestOptions({
      headers: this.getHeaders(),
      body: data
    });

    return this.http.delete(environment.auth_end_point + 'permission', options)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }


  /* User */

  getUser(id) {
    return this.http.get(environment.auth_end_point + 'user/' + id, { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(environment.auth_end_point + 'user', data, { headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  deleteUser(data: any): Observable<any> {
    const options = new RequestOptions({
      headers: this.getHeaders(),
      body: data
    });

    return this.http.delete(environment.auth_end_point + 'user', options)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  @Output() userLoggedInEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    // window.location.href = '';
    return true;
  }
}
