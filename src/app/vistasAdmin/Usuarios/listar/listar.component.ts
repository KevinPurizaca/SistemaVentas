import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { UsuarioService } from 'src/app/vistasAdmin/Services/Usuario.service';
import { Usuario } from 'src/app/vistasAdmin/Model/Usuario';
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
  constructor(
    private usuarioService:UsuarioService
  ) { }

  ngOnInit() {
    this.listarUsuario()
  }

  cambiarPagina(){}
  editarUsuario(){}
  eliminarUsuario(){}

  listarUsuario(){
    this.usuarioService.getAll().subscribe(data=>{
      if(!data){
        return
      }
      this.usuarios=data
      this.totalRecord = data.length
      this.loading= false
    })

  }
}
