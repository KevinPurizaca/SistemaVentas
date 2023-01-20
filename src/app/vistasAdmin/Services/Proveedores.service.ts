import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import{MetodosHttp} from 'src/app/core/util/MetodosHttp'
import { environment } from 'src/environments/environment';
import { Proveedor } from '../Model/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private url:string="Proveedor";

constructor(private http:HttpClient) { }

  getAll(req:any):Observable<Proveedor[]>{
    return this.http.post<Proveedor[]>(environment.UrlBase+this.url+MetodosHttp.Listar,req)
  }
}
