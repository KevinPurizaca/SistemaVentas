import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import Firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import { environment } from 'src/environments/environment';
import { Categoria_Producto } from 'src/app/vistasAdmin/Model/Categoria_Producto';
import { MetodosHttp } from 'src/app/core/util/MetodosHttp';

Firebase.initializeApp(environment.firebaseConfig)

@Injectable({
  providedIn: 'root'
})
export class CategoriaproductoService {

  private url:string="Categorias";


  storageRef = Firebase.app().storage().ref();
  id:number=0;

  constructor(
    private http:HttpClient,
    
  ) { }
//gs://proyectopersonal-c5b87.appspot.com/Categoria


 getAll(req:any):Observable<Categoria_Producto[]>{
  return this.http.post<Categoria_Producto[]>(environment.UrlBase+this.url+MetodosHttp.Listar,req)
}

update(categoria:Categoria_Producto):Observable<Categoria_Producto>{
  return this.http.put<Categoria_Producto>(environment.UrlBase+this.url+MetodosHttp.Actualizar,categoria);
}

delete(id:number):Observable<Categoria_Producto>{
  return this.http.delete<Categoria_Producto>(environment.UrlBase+this.url+MetodosHttp.Eliminar+id)
}

crear(req:Categoria_Producto):Observable<Categoria_Producto[]>{
  return this.http.post<Categoria_Producto[]>(environment.UrlBase+this.url+MetodosHttp.Crear,req)
}

cambiarestado(categoria:Categoria_Producto):Observable<Categoria_Producto>
  {
    return this.http.put<Categoria_Producto>(environment.UrlBase+this.url+MetodosHttp.ActualizarEstado,categoria)
  }
}
