import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { UsuarioService } from 'src/app/vistasAdmin/Services/Usuario.service';
import { Usuario } from 'src/app/vistasAdmin/Model/Usuario';
import { HttpCoreService } from 'src/app/core/services/HttpCore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComboModel } from 'src/app/core/util/combo';
import { DomSanitizer } from '@angular/platform-browser';
import { SubirImagenesFirebaseService } from '../../Services/subirImagenesFirebase.service';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  //providers:[MessageService,ConfirmationService]
})
export class ListarComponent implements OnInit {

  loading:boolean=true;
  loadinga:boolean=false;

  totalRecord:number=0;
  usuarios:Usuario[]=[];
  lstTipoUsuario:ComboModel[]=[];

  letrasPattern = "[a-zA-ZáéíóúÁÉÍÓÚ ]*";
  correoPattern = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  numerosPattern = "[0-9]*";

  formUsuario: FormGroup;

  idDialog:boolean=false;
  editar:boolean=false;
  visibleEditar:boolean=true;
  selectedUsuarios!: Usuario[];
  lsUsuariodto!:Usuario;
  indice:number=0;
  limite:number=5;

  acceptedFiles = '.jpeg,.jpg,.png,.webp,.jfif';
  uploadedFiles: any[] = [];
  httpHeaders: any;
  first:number=0;
  urlimagen:any;
  submitted:boolean=false;
  req={
    id:-1,
    correo:'',
    indice:0,
    limite:1000,
    estado:-1
  }

  reqEditar={
    id:0,
    nombre:'',
    apellidos_p:'',
    apellidos_m:'',
    correo:'',
    idRol:-2,
    password:'',
    dni:0,
    telefono:0,
    urlImagen:'',

  }
  constructor(
    fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private httpCoreService:HttpCoreService,
    private usuarioService:UsuarioService,
    private messageService:MessageService,
    private firebase:SubirImagenesFirebaseService
  ) {
    this.formUsuario = fb.group({

      cboRol: [-1],
      txtNombre: ['',[Validators.pattern(this.letrasPattern)]],
      txtApellidosP: ['',[Validators.pattern(this.letrasPattern)]],
      txtApellidosM: ['',[Validators.pattern(this.letrasPattern)]],
      txtCorreo: ['',[Validators.pattern(this.correoPattern)]],

      txtTelefono: ['',[Validators.pattern(this.numerosPattern)]],
      txtNroDocumento: ['',[Validators.pattern(this.numerosPattern)]],
      txtContraseña: [''],
    });
   }

  ngOnInit() {
    this.getTipoUsuario();
    this.listarUsuario(this.req);
  }

  cambiarPagina(){}
  
  async guardarUsuario(){
    this.submitted = true;
    for (let c in this.formUsuario.controls) {
      this.formUsuario.controls[c].markAsTouched();
  }
  let file= this.uploadedFiles[0];
  if(this.formUsuario.valid){
    this.loadinga=true;
    if(this.reqEditar.id == 0){
  
      this.httpCoreService.post(this.reqEditar,'Usuario/CrearUsuario').subscribe(res=>{
          if(!res.isSuccess){
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: res.message });
            this.loadinga=false;
            return
          }
         
          this.reqEditar.id= res.codigo
          this.firebase.subirImagen("Usuarios/",this.reqEditar.correo,file).then((url:any)=>{
          this.reqEditar.urlImagen = url;          
          this.httpCoreService.post(this.reqEditar,'Usuario/CrearUsuario').subscribe(res=>{
          this.messageService.add({ key: 'tst',  severity: 'info',  summary: 'Confirmado', detail:res.message });
          this.idDialog = false;
         // console.log("ResSegundo",res);
         this.loadinga=false;
          this.listarUsuario(this.req);
        })
       })
  //     console.log("ResPrimero",res);
      })

    }
    //CODIGO PARA ACTUALIZAR
    else{
      let url = this.lsUsuariodto.imagen;
      //verifica que la imagen ha cambiado sino solo actualizara el nombre y la misma url de la imagen
      if(url == this.urlimagen){
        this.httpCoreService.post(this.reqEditar,'Usuario/CrearUsuario').subscribe(res=>{
          if(!res.isSuccess){
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: res.message });
            this.loadinga=false;
            return
          }
          this.loadinga=false;
          this.messageService.add({ key: 'tst',  severity: 'info',  summary: 'Confirmado', detail:'Datos Actualizados.' });
          this.idDialog = false;
          this.listarUsuario(this.req);
        })
      }
            //si la imagen cambia remplazara la imagen alojada en firebase por la nueva

      else if(url!= this.urlimagen){
        this.firebase.subirImagen("Usuarios/",this.reqEditar.correo,file).then((url:any)=>
        {
          this.reqEditar.urlImagen = url;
          this.httpCoreService.post(this.reqEditar,'Usuario/CrearUsuario').subscribe(res=>{
            if(!res.isSuccess){
              this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: res.message });
              this.loadinga=false;
              return
            }
            this.messageService.add({ key: 'tst',  severity: 'info',  summary: 'Confirmado', detail:'Datos Actualizados.'});
            this.idDialog = false;
            this.listarUsuario(this.req);
            this.loadinga=false;
          })
        })
      
      }


    }
  }  
}
  eliminarUsuario(){}

  hideDialog(){
    this.idDialog=false;
    this.reqEditar.id =0;
  }
  crear(){
    this.reqEditar.id =0;
    this.editar=false;
    this.idDialog=true;
    this.visibleEditar=true;

  }
  eliminar(){}
  
  listarUsuario(req:any){
    this.httpCoreService.post(req,'Usuario/Listar').subscribe(res=>{
      this.usuarios= res.data;
      this.loading=false;
    //  console.log(res);
      this.totalRecord = res.totalregistro;
    }
      )
  }

  cambiarEstado($event:any,data:any){}

  editUsuario(item:any){
    console.log(item)
    this.lsUsuariodto =item;
    this.urlimagen = item.imagen,

    this.editar=true;
    this.visibleEditar=false;
    this.idDialog=true;
    this.reqEditar.id =item.id;
    this.reqEditar.nombre = item.nombre;
    this.reqEditar.apellidos_p = item.apellido_p;
    this.reqEditar.apellidos_m = item.apellido_m;
    this.reqEditar.correo = item.correo;
    this.reqEditar.password = item.password;
    this.reqEditar.telefono = item.telefono;
    this.reqEditar.dni = item.dni;
    this.reqEditar.idRol = item.idRol;
  //  this.reqEditar.urlImagen = item.imagen;
    

  }

  getTipoUsuario(){
    this.httpCoreService.get('Usuario/TipoUsuarioListar').subscribe(res=>{
      if(!res.isSuccess)
      {
        this.messageService.add({key: 'tst',severity: 'error',summary: 'Error Message',detail:res.message + ' ' + res.innerException});
        return
      }
      this.lstTipoUsuario.push({id:-1,nombre:'Seleccione'})
      this.lstTipoUsuario = this.lstTipoUsuario.concat(res.data);
  })
  }
  deleteUsuario(data:any){}
  limpiarFormulario(){}
  buscar(){}

  leerimagenes(event:any){
    this.uploadedFiles.splice(event.files);
    for(let file of event.files) {
              this.uploadedFiles.push(file);      
  }  
   }
  leerimagenes2(event:any){
    this.uploadedFiles.splice(event.target.files);
     for(let file of event.target.files) {
       this.extraerBase64(file).then((imagen: any) => {
           this.lsUsuariodto.imagen = imagen.base
           this.uploadedFiles.push(file);
           
       });
   }
  }
  extraerBase64 = async ($event: any) =>
new Promise((resolve, reject) => {
  try {
    const unsageImg = window.URL.createObjectURL($event);
    const image = this.sanitizer.bypassSecurityTrustUrl(unsageImg);
    const reader = new FileReader();

    reader.readAsDataURL($event);
    reader.onload = () => {
      resolve({
        base: reader.result,
      });
    };
    reader.onerror = (error) => {
      resolve({
        base: null,
      });
    };
  } catch (error) {}
  });
}
