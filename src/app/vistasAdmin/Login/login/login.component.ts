import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { Login } from 'src/app/core/Models/login';
import { ResponseI } from 'src/app/core/Models/response';

import * as sha512 from 'js-sha512';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsuarioService } from 'src/app/vistasAdmin/Services/Usuario.service';
import { Usuario } from '../../Model/Usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {


  loginForm:FormGroup;

  nombre:string="";
  correo:string="";
  password:string="";



  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  op=0;
  usuario?: Usuario[] = [];

  constructor(
    private http:UsuarioService,
    private auth:AuthService,
    private router:Router ,
    private messageService:MessageService,
    fb: FormBuilder, 
    ) {
    this.loginForm = fb.group({
      correo: ['',[Validators.pattern(this.emailPattern),Validators.required]],
      password: ['',[Validators.required]],

  });


   }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
    this.router.navigate(['Productos/Listar']);

    }
  }

  
req={
 vCorreo:"k@gmail.com",
 vPassword:"123456"
}



    
  errorMessage=[]
  
  user=[]
  
  token:string='abcdefghijklmnopqrstuvwxyz';

  onLogin(){     

    let _req={
      vCorreo :this.req.vCorreo,
      vPassword : this.req.vPassword,//sha512.sha512(this.req.vPassword).toString().toUpperCase(),
    }
   // console.log(_req)
    // let _req = {
    //   userName: this.req.userName,
    //   password: sha512.sha512(this.req.password).toString().toUpperCase(),
    //   googleToken: ''this.req.password,
    // };
  if (!(this.req.vCorreo == '' || this.req.vCorreo == undefined) && !(this.req.vPassword == '' || this.req.vPassword == undefined)) {
      this.http.loginByEmail(_req).subscribe((res:any) => {
       // console.log(res.data[0].token);
      //  console.log(res.data.token);
  
        if (!res.isSuccess) {
          this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message',
                                 detail: res.message + ' ' + (res.messageExeption == null ? '' : res.messageExeption) });
                              //   console.log(_req)
          return;
        }
  //      console.log(_req)
        this.router.navigate(['Productos/Listar'])
      },
        (error: any) => {
          this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error });
        }
      ); 
    } else {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Ingrese Información de Usuario' });
    }





      //  if (!res.isSuccess) {
      //   this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: res.message + ' ' + (res.messageExeption == null ? '' : res.messageExeption) });
      //   return;
      // }

         

           
    

  }

  addSingle() {
    this.messageService.add({key: 'tst',severity:'success', summary:'Service Message', detail:'Via MessageService'});
}


}
