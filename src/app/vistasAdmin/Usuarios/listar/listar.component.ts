import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { UsuarioService } from 'src/app/vistasAdmin/Services/Usuario.service';
import { Usuario } from 'src/app/vistasAdmin/Model/Usuario';
import { HttpCoreService } from 'src/app/core/services/HttpCore.service';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers:[MessageService,ConfirmationService]
})
export class ListarComponent implements OnInit {

  loading=true
  totalRecord=0
  usuarios:Usuario[]=[]

  selectedUsuarios!: Usuario[];
  indice:number=0;
  limite:number=5;

  req={
    indice:0,
    limite:5,
    estado:-1
  }
  constructor(
    private httpCoreService:HttpCoreService,
    private usuarioService:UsuarioService,
    private messageService:MessageService
  ) { }

  ngOnInit() {
    this.listarUsuario(this.req)
  }

  cambiarPagina(){}
  editarUsuario(){}
  eliminarUsuario(){}
  crear(){}
  eliminar(){}
  
  listarUsuario(req:any){
    this.httpCoreService.post(req,'Usuario/Listar').subscribe(res=>{
      this.usuarios= res.data;
      this.loading=false;
      console.log(res);
      this.totalRecord = res.totalregistro;
    }
      )
  }

  cambiarEstado($event:any,data:any){}
  editUsuario(data:any){}
  deleteUsuario(data:any){}
}
