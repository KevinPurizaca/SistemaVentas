import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { Login } from 'src/app/core/Models/login';
import { ResponseI } from 'src/app/core/Models/response';


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
  correo:string="a@gmail.com";
  contrasenia:string="";



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
      contrasenia: ['12345',[Validators.required]],

  });


   }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
    this.router.navigate(['Productos/Listar']);

    }
  }




    
  errorMessage=[]
  
  user=[]
  
  token:string='abcdefghijklmnopqrstuvwxyz';

  onLogin(form: Login){     
      
    //console.log(form);
   this.http.loginByEmail(form).subscribe(data=>{
        let dataResponse:ResponseI=data;
        console.log(data);
        console.log("datareesponde",dataResponse);
        if(dataResponse.success== true){
          localStorage.setItem('Token', dataResponse.data[0].token);
          localStorage.setItem("Nombre",dataResponse.data[0].nombre)
          localStorage.setItem('Apellido_p', dataResponse.data[0].apellido_p);
          localStorage.setItem('Apellido_m',dataResponse.data[0].apellido_m);       
          localStorage.setItem('Telefono', dataResponse.data[0].telefono);

          localStorage.setItem('Correo', dataResponse.data[0].correo);
          localStorage.setItem('Imagen',dataResponse.data[0].imagen)
          localStorage.setItem('Dni', dataResponse.data[0].dni);   

          this.router.navigate(['Productos/Listar'])
        // this.messageService.add({key: 'tst',severity:'success', summary:'Service Message', detail:dataResponse.message});
        }
        else{
          this.messageService.add({key: 'tst',severity:'error', summary:'Service Message', detail:dataResponse.message});

        }
    },     
       
     error => this.errorMessage= error.error.message
     
    );   

  }

  addSingle() {
    this.messageService.add({key: 'tst',severity:'success', summary:'Service Message', detail:'Via MessageService'});
}


}
