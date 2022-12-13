import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodosHttp } from 'src/app/core/util/MetodosHttp';
import { DescripcionProducto } from 'src/app/vistasAdmin/Model/DescripcionProducto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DescripcionproductoService {

  private url:string="DescProducto"


  
  
  constructor( private http:HttpClient) { }


  //LISTAR productos
  getDescProductoAll():Observable<DescripcionProducto[]>{
    return this.http.get<DescripcionProducto[]>(environment.UrlBase+this.url+MetodosHttp.Listar);
  }

  


}
