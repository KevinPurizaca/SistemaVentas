import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders,HttpResponse } from '@angular/common/http';
//import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import {catchError, map, mapTo} from 'rxjs/operators'
import { Usuario } from 'src/app/vistasAdmin/Model/Usuario';
import Firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import { environment } from 'src/environments/environment';
//import { Login } from 'src/app/vistasAdmin/login';
import { throwError as observableThrowError } from 'rxjs';
import { ResponseI } from 'src/app/vistasAdmin/Model/response';
import { Login } from 'src/app/core/Models/login';

import{MetodosHttp} from 'src/app/core/util/MetodosHttp'

Firebase.initializeApp(environment.firebaseConfig)

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  storageRef = Firebase.app().storage().ref();


 
  private url:string="Usuario";

//token xd
  token:string='abcdefghijklmnopqrstuvwxyz';
name:string=""


  constructor( private http:HttpClient,
    private router:Router  
    
    
    ) { }


    async subirImagen( nombre:string,
      imgBase64:any){
    
        try {
          let respuesta = await this.storageRef.child("users/"+nombre).putString(imgBase64,'data_url');
         // console.log(respuesta)
          
          return await respuesta.ref.getDownloadURL() ;
  
          
          
        } catch (error) {
          console.log(error)
          return null;
        }
    
    }


  getAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(environment.UrlBase+this.url+MetodosHttp.Listar).pipe(
          catchError(this.errorHandler),
        
    );
  }
  getAllDelete():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(environment.UrlBase+this.url+MetodosHttp.Listar)
  }
  
  create(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(environment.UrlBase+this.url+MetodosHttp.Crear,usuario);
  } 
 //ACTUALIZAR USUARIOS
 update(usuario:Usuario):Observable<Usuario>{
  return this.http.put<Usuario>(environment.UrlBase+this.url+MetodosHttp.Actualizar,usuario);
}

//envia a la papelera de reciclaje
delete(id:number):Observable<Usuario>{
  return this.http.delete<Usuario>(environment.UrlBase+this.url+MetodosHttp.Eliminar+id)
}


//elimina los productos difinitivamente
deleteTotal(id:number):Observable<Usuario>{
  return this.http.delete<Usuario>(environment.UrlBase+"deleteTotal/"+id)
}

//restaura productos
restaura(id:number):Observable<Usuario>{
  return this.http.delete<Usuario>(environment.UrlBase+"restaurar/"+id)
}




getUsuarioId(id: number){
  return this.http.get<Usuario>(environment.UrlBase+this.url+MetodosHttp.ListarId+id);
}



getToken(): string | null {
  return localStorage.getItem('token');
}

isLoggedIn() {
  return this.getToken() !== null;
}

logout() {
  localStorage.removeItem('Token');
  localStorage.removeItem('Nombre')
  localStorage.removeItem('Apellido_p');
  localStorage.removeItem('Apellido_m')
  localStorage.removeItem('Telefono');
  localStorage.removeItem('Correo')
  localStorage.removeItem('Imagen')
  localStorage.removeItem('Dni');
  localStorage.removeItem('email')
  localStorage.removeItem('phone');
  localStorage.removeItem('image')
  

  
  this.router.navigate(['Login']);
}


 loginByEmail(form:Login):Observable<ResponseI>{
  return this.http.post<ResponseI>(environment.UrlBase+this.url+MetodosHttp.Login,form)
  
  }


errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.message)
 }



/*
//estos son pero con autentificacion con firebase

  async login(correo:string,contrasena:string){
    try {
      return await this.anfiauth.signInWithEmailAndPassword(correo,contrasena);
    } catch (error) {
      console.log("Error al ingresar ",error);
      return null;
    }

  }

  async loginConGoogle(correo:string,contrasena:string){
    try {
      return await this.anfiauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log("Error al ingresar con google",error);
      return null;
    }

  }

  async loginConFacebook(correo:string,contrasena:string){
    try {
      return await this.anfiauth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    } catch (error) {
      console.log("Error al ingresar con facebook",error);
      return null;
    }

  }

  obtenerusuario(){
    return this.anfiauth.authState;

    
  }

  Logout(){
    this.anfiauth.signOut();
  }*/

  /*
  
   constructor(private anfiauth:AngularFireAuth) { }

  async register(correo:string,contrasena:string){
    try {
      return await this.anfiauth.createUserWithEmailAndPassword(correo,contrasena);
    } catch (error) {
      console.log("Error al ingresar ",error);
      return null;
    }

  }

  async login(correo:string,contrasena:string){
    try {
      return await this.anfiauth.signInWithEmailAndPassword(correo,contrasena);
    } catch (error) {
      console.log("Error al ingresar ",error);
      return null;
    }

  }

  async loginConGoogle(correo:string,contrasena:string){
    try {
      return await this.anfiauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log("Error al ingresar con google",error);
      return null;
    }

  }

  async loginConFacebook(correo:string,contrasena:string){
    try {
      return await this.anfiauth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    } catch (error) {
      console.log("Error al ingresar con facebook",error);
      return null;
    }

  }

  obtenerusuario(){
    return this.anfiauth.authState;

    
  }


  */
   
}
