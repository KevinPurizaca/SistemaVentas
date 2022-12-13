import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodosHttp } from 'src/app/core/util/MetodosHttp';
import { Orders } from 'src/app/vistasAdmin/Model/orders';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  
export class OrderService {

    private url:string="Orden"


    constructor(private http:HttpClient) { }

    getAll():Observable<Orders[]>{
        return this.http.get<Orders[]>(environment.UrlBase+this.url+MetodosHttp.Listar)
    }

    getOrdersId(id:number):Observable<Orders>{
        return this.http.get<Orders>(environment.UrlBase+this.url+MetodosHttp.ListarId+id);
      }
}
  