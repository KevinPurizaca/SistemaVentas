import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodosHttp } from 'src/app/core/util/MetodosHttp';
import { Marcaproducto } from 'src/app/vistasAdmin/Model/MarcaProducto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaproductoService {



  private url:string="Marcas";


  constructor(private http:HttpClient) { }

  getAll(req:any):Observable<Marcaproducto[]>{
    return this.http.post<Marcaproducto[]>(environment.UrlBase+this.url+MetodosHttp.Listar,req);
  }

   //CREAR PRODUCTOS
  create(marca:Marcaproducto):Observable<Marcaproducto>{
    return this.http.post<Marcaproducto>(environment.UrlBase+this.url+MetodosHttp.Crear,marca);
  }
  
  //OBTENER PRODUCTO
  getId(id: number){
    return this.http.get<Marcaproducto>(environment.UrlBase+this.url+MetodosHttp.ListarId+id);
  }

  //ACTUALIZAR PRODUCTOS
  update(marca:Marcaproducto):Observable<Marcaproducto>{
    return this.http.put<Marcaproducto>(environment.UrlBase+this.url+MetodosHttp.Actualizar,marca);
  }

  //ELIMINAR PRODUCTOS

  delete(id:number):Observable<Marcaproducto>{
    return this.http.delete<Marcaproducto>(environment.UrlBase+this.url+'/'+id)
  }
  
}
