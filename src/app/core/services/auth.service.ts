import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseI } from 'src/app/vistasAdmin/Model/response';
import { Login } from 'src/app/core/Models/login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
//  toma note crear url aparte
  private url:string="api/users/";
  private url2:string="/Usuario/";
  private ip:string="http://192.168.0.106:3000/"
  private ip2:string="http://localhost:3000"
  constructor(private router: Router,private http:HttpClient,
     ) {}

  setToken(token: string): void {
    localStorage.setItem('userdata', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('userdata');
    localStorage.removeItem('token');
    this.router.navigate(['Home']);
  }

  loginByEmail(form:Login):Observable<ResponseI>{
    return this.http.post<ResponseI>(this.ip2+this.url2+"Login",form)
    
    }


}
