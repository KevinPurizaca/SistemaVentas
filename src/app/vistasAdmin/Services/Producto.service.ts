import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { Producto } from 'src/app/Clases/producto';
import Firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/vistasAdmin/Model/Producto';

import{MetodosHttp} from 'src/app/core/util/MetodosHttp'
import { DescripcionProducto } from '../Model/DescripcionProducto';
import { Subject } from 'rxjs';


Firebase.initializeApp(environment.firebaseConfig)

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  private url:string="Producto";
 
  storageRef = Firebase.app().storage().ref();

  items: any[] = [];

  
  
  constructor( private http:HttpClient) { }

  //LISTAR productos


  getProductoAll(req:any):Observable<Producto[]>{
    return this.http.post<Producto[]>(environment.UrlBase+this.url+MetodosHttp.Listar,req)
  }
  
 
  //ACTUALIZAR PRODUCTOS
  update(producto:Producto):Observable<Producto>{
    return this.http.put<Producto>(environment.UrlBase+this.url+MetodosHttp.Actualizar,producto);
  }
  
  cambiarestado(producto:Producto):Observable<Producto>
  {
    return this.http.put<Producto>(environment.UrlBase+this.url+MetodosHttp.ActualizarEstado,producto)
  }
 

  delete(id:number):Observable<Producto>{
    return this.http.delete<Producto>(environment.UrlBase+this.url+MetodosHttp.Eliminar+id)
  }
  

  public HanddleErrorMessage(err: any) {
    console.error(err);
    // this.messageService.add({
    //   key: 'tst',
    //   severity: 'error',
    //   summary: 'Error Message',
    //   detail: err.message + ' ' + err.innerException,
    // });
  }





getProductoAllDelete():Observable<Producto[]>{
  return this.http.get<Producto[]>(environment.UrlBase+this.url+"getAllDelete")
}

  async subirImagen( nombre:string,
    imgBase64:any){
  
      try {
        let respuesta = await this.storageRef.child("productos/"+nombre).putString(imgBase64,'data_url');
       // console.log(respuesta)
        
        return await respuesta.ref.getDownloadURL() ;

        
        
      } catch (error) {
        console.log(error)
        return null;
      }
  
  }
}
