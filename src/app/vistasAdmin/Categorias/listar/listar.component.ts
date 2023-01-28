import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService, ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { HttpCoreService } from 'src/app/core/services/HttpCore.service';
import { Categoria_Producto } from 'src/app/vistasAdmin/Model/Categoria_Producto';
import { CategoriaproductoService } from 'src/app/vistasAdmin/Services/Categoria_Producto.service';
import { SubirImagenesFirebaseService } from '../../Services/subirImagenesFirebase.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [MessageService,ConfirmationService ]

})
export class ListarComponent implements OnInit {

  loading=true;
  loadingc=false;
  idDialog:boolean=false;
  idDialogc:boolean=false;
  submitted: boolean = false;
  first:number=0;
  loadinga:boolean=false;
  
  formCategoriaEditable: FormGroup;
  formCategoriaCrear: FormGroup;
  
  totalRecord=0;
  categoria:Categoria_Producto[]=[]
  lsCategoriadto!:Categoria_Producto;
  limite:number=5;

  urlimagen:any;

  acceptedFiles = '.jpeg,.jpg,.png,.webp,.jfif';
 uploadedFiles: any[] = [];
  httpHeaders: any;

  categoria2:Categoria_Producto= new Categoria_Producto()

  constructor(
    private categoriaService:CategoriaproductoService,
    fbpe:FormBuilder,
    private httpCore:HttpCoreService,
    private primengConfig: PrimeNGConfig,
    private messageService:MessageService,
    private _confirmationService: ConfirmationService,
    private firebase:SubirImagenesFirebaseService,
    private sanitizer: DomSanitizer,
  ) {


    
    this.formCategoriaEditable = fbpe.group({
      txtNombredg: ['',[Validators.required]],     
    });
    this.formCategoriaCrear = fbpe.group({
      txtNombre: ['',[Validators.required]],
    });

    this.listarCategoria(this.req)
   }

  req={
    indice:0,
    limite:100,
    estado:-1
  }
  ngOnInit() {}

  listarCategoria(req:any){
    this.httpCore.post(req,'Categorias/ListarCategoria').subscribe(res=>{
      this.categoria = res.data;
      this.loading= false;
      this.totalRecord = res.totalregistro;
    })
  }

  editarCategoria(event: Event,item: any){
    this.lsCategoriadto =item;
   // let value = item
    this.urlimagen = item.imagen,
   
    this.submitted = false;
    this.idDialog = true;
  }

  eliminarCategoria(event: Event, item: any){

    this._confirmationService.confirm({
      key: 'deleteCategoria',
      target: event.target || new EventTarget(),
      message: 'Desea eliminar la Categoria?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          if (item > 0) {
              this.categoriaService.delete(item)
                  .subscribe((res: any) => {
                      if (res.success==false) {
                          this.messageService.add({
                              key: 'tst',
                              severity: 'error',
                              summary: 'Error Message',
                              detail:
                                  res.messag,
                          });
                          return;
                      } 
                    else {
                          this.messageService.add({
                              key: 'tst',
                              severity: 'info',
                              summary: 'Confirmado',
                              detail:
                              res.message 
                          });
                          this.listarCategoria(this.req)
                      }
                  });
      
          } else {
           
            this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Rechazado',
              detail: 'Registro no Eliminado',
          });
          }
      },
      reject: () => {
          this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Rechazado',
              detail: 'Registro no Eliminado',
          });
      },
  });

  }

  cambiarPagina(event:any){
    this.req.indice= event.first ;
    this.req.limite= event.rows;
   
    this.listarCategoria(this.req);
    this.first = event.first;
  } 

  hideDialog(){
    this.idDialog = false;
    this.submitted = false;
    this.idDialogc = false;
  }

async actualizar(event:any){

  this.submitted = true;
  this.idDialog = true;


if(this.formCategoriaEditable.valid){
  let file= this.uploadedFiles[0];
  
  this.submitted = false;
  this.loadinga=true;
  
  let url = this.lsCategoriadto.imagen
if(this.lsCategoriadto.imagen == this.urlimagen){

  this.categoria2={
    "id":this.lsCategoriadto.id,
    "nombre":this.lsCategoriadto.nombre ,
   "imagen": url     
  } 

this.httpCore.post(this.categoria2,'Categorias/CrearCategoria').subscribe(res=>{
if(!res.isSuccess)
{
  this.loadinga=false;
  this.idDialog = true; 
  this.messageService.add({key: 'tst',severity: 'error',summary: 'Error Message',detail:res.message + ' ' +res.innerException});
  return   
}
this.submitted = false;
this.idDialog = false; 
this.loadinga=false;
this.listarCategoria(this.req)
this.messageService.add({key: 'tst',severity: 'info',summary: 'Confirmado',detail:res.message});

})

}
else if(this.lsCategoriadto.imagen != this.urlimagen){

  this.firebase.subirImagen("Categoria/",this.lsCategoriadto.nombre,file).then((url:any)=>
  {
     if(url){
      this.categoria2={
        "id":this.lsCategoriadto.id,
        "nombre":this.lsCategoriadto.nombre ,
       "imagen": url     
      } 
    
  this.httpCore.post(this.categoria2,'Categorias/CrearCategoria').subscribe(res=>{
    if(!res.isSuccess)
    {
      this.loadinga=false;
      this.idDialog = true; 
      this.messageService.add({key: 'tst',severity: 'error',summary: 'Error Message',detail:res.message + ' ' +res.innerException});
      return   
    }
    this.submitted = false;
    this.idDialog = false; 
    this.loadinga=false;
    this.listarCategoria(this.req)
    this.messageService.add({key: 'tst',severity: 'info',summary: 'Confirmado',detail:res.message});
 
  })
     }

     else{
      this.loadinga=false;
      this.messageService.add({key: 'tst',severity: 'error',summary: 'Error Message',detail:'Error al Subir la Imagen a Firebase.'});
  }
 }
  )

}
else{
  this.loadinga=false;
  this.messageService.add({key: 'tst',severity: 'error',summary: 'Error Message',detail:'Error XD.'});

}

}
  }

  crear(){
    this.submitted = false;
    this.idDialogc = true;
    this.categoria2={}
  }

  leerimagenes(event:any){
    this.uploadedFiles.splice(event.files);
    for(let file of event.files) {
              this.uploadedFiles.push(file);    
  
  }
  
  }

  async crearCategoria(){
  this.submitted = true;
  let file= this.uploadedFiles[0];
  let value = this.formCategoriaCrear.value
   for (let c in this.formCategoriaCrear.controls) {
    this.formCategoriaCrear.controls[c].markAsTouched();
}
if(this.formCategoriaCrear.valid){

  this.loadingc=true
  this.firebase.subirImagen("Categoria/",value.txtNombre,file)
  .then((url:any)=>{
    this.categoria2={
      "id":0,
      "nombre": value.txtNombre,
      "imagen":url
      
      }
      this.loadingc=false;
    
this.httpCore.post(this.categoria2,'Categorias/CrearCategoria').subscribe(res=>{
        if(res.success=false){  
          this.messageService.add({key: 'tst',severity: 'error',summary: 'Error Message',detail:res.message + ' ' + res.innerException});
          return  
  
        }else{
          this.submitted = false;
          this.idDialogc = false; 
          this.listarCategoria(this.req)
          this.messageService.add({key: 'tst',severity: 'info',summary: 'Confirmado',detail:res.message });
        }
      })
  }) 
  }

 }


 cambiarestado(event:any,item:any){
  this.lsCategoriadto=item; 
  const req={
        id:item.id,
        estado: (item.estado == 1 ? 0 : 1),
  }
  this.httpCore.post(req,'Categorias/ActualizarEstado').subscribe(res=>{
        if(!res.isSuccess){
          this.messageService.add({key: 'tst',severity: 'error',summary: 'Error Message',detail:res.message + ' ' + res.innerException});
          return
        }
        this.messageService.add({key: 'tst',severity: 'info',summary: 'Confirmado',detail:res.message,life:1000 ,closable:false });
        this.listarCategoria(this.req)
      })   
    
}


leerimagenes2(event:any){
   this.uploadedFiles.splice(event.target.files);
    for(let file of event.target.files) {
      this.extraerBase64(file).then((imagen: any) => {
          this.lsCategoriadto.imagen = imagen.base
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
