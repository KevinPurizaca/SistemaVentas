import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodosHttp } from 'src/app/core/util/MetodosHttp';
import { Order_has_products } from 'src/app/vistasAdmin/Model/Order_has_products';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Order_has_productsService {
  private url:string="OrdenDetalle"
  

  constructor(private http:HttpClient) { }

  getAll():Observable<Order_has_products[]>{
      return this.http.get<Order_has_products[]>(environment.UrlBase+this.url+MetodosHttp.Listar)
  }

  getOrdersId(id:number):Observable<Order_has_products[]>{
      return this.http.get<Order_has_products[]>(environment.UrlBase+this.url+MetodosHttp.ListarId+id);
    }
}
