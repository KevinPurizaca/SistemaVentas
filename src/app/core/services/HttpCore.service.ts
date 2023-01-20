import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpCoreService {

constructor(
  private http:HttpClient,
  private router:Router
) { }


public get (collection:string): Observable<any>{
  const url = environment.UrlBase +collection;

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),     
  };

  return this.http.get<any[]>(url, httpOptions).pipe(
    tap((data:any)=>{

    }),
    catchError(
      err=>{
        return this.EstatusError(err);
      }),
  );
}

public post(req: any, collection: string): Observable<any> {
  const jsonrequest = JSON.stringify(req);
  const url = environment.UrlBase + collection;

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  return this.http.post<any>(url, jsonrequest, httpOptions).pipe(
    tap((data: any) => {

    }),
    catchError(err => {
    //  console.log(err);
    // console.log(err.error);
      return this.EstatusError(err);
    }),
  );
}




EstatusError(err:any):any{
  if (err.status == 0) {
    console.error('Error, la conexión con el servidor no es posible: %', err.error.message+ ' ' + err.error.innerException);
    throw 'Error, la conexión con el servidor no es posible: '  + err.error.message + ' ' + err.error.innerException ;
  }
  if (err.status == 401) {
    console.error('Error, Falta de Autorización: ' + err.error.message+ ' ' + err.error.innerException);
    throw 'Error, Falta de Autorización: ' + + err.error.message + ' ' + err.error.innerException ;
  }
  if (err.status == 400) {
    console.error('Error, Servicio com Problemas: ' + err.error.message );
    throw 'Error, Servicio con Problemas: ' +  + err.error.message  ;
  }
  if (err.status == 403) {
    console.error('Error, Falta de permisos para el servicio: ' + err.error.message+ ' ' + err.error.innerException);
    throw 'Error, Falta de permisos para el servicio: ' + + err.error.message + ' ' + err.error.innerException ;
  }

  if (err.status == 501) {
    console.error('Error, Falta de Requisitos para ejecutar el Servicio: ' + err.error.message);
    throw 'Error, Falta de permisos para el servicio: ' + + err.error.message ;
  }
  //console.log("httpErrorErro;",err.error);
 // console.log("httpErro;",err);
  throw 'Error in source. Details: ' + err.error;
}
}
