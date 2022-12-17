import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService, ConfirmationService, PrimeNGConfig } from 'primeng/api';
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
  first:number=0
  
  formCategoriaEditable: FormGroup;
  formCategoriaCrear: FormGroup;
  
  totalRecord=0;
  categoria:Categoria_Producto[]=[]
  lsCategoriadto!:Categoria_Producto;


  acceptedFiles = '.jpeg,.jpg,.png,.webp,.jfif';
 uploadedFiles: any[] = [];
  httpHeaders: any;

  categoria2:Categoria_Producto= new Categoria_Producto()

  constructor(
    private categoriaService:CategoriaproductoService,
    fbpe:FormBuilder,
    private primengConfig: PrimeNGConfig,
    private messageService:MessageService,
    private _confirmationService: ConfirmationService,
    private firebase:SubirImagenesFirebaseService,
    private sanitizer: DomSanitizer,
  ) {


    
    this.formCategoriaEditable = fbpe.group({
    //  txtIddg:['',[Validators.required]],
      txtNombredg: ['',[Validators.required]],
     
    });
    this.formCategoriaCrear = fbpe.group({
   //   txtId:['',[Validators.required]],
      txtNombre: ['',[Validators.required]],
     
     
    });
   }

  req={
    indice:0,
    limite:5,
    id_estado:1
  }

  ngOnInit() {
    this.listarCategoria(this.req)
  }


  listarCategoria(req:any){
    this.categoriaService.getAll(req).subscribe((data:any)=>{
     
      if(!data){
        return
      }        

        this.categoria=  data,
        this.loading=false,
        this.totalRecord = data[0].totalrecord;
      
     

    })
  }


  editarCategoria(event: Event,item: any){
    this.lsCategoriadto =item;
    let value = item

    this.submitted = false;
    this.idDialog = true;
  }

  eliminarCategoria(event: Event, item: any){

    this._confirmationService.confirm({
      key: 'deleteCategoria',
      target: event.target || new EventTarget(),
      message: 'Desea eliminar el Categoria?',
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

actualizar(event:any){

  this.submitted = true;
  this.idDialog = true;
  let value = this.formCategoriaEditable.value
   for (let c in this.formCategoriaEditable.controls) {
    this.formCategoriaEditable.controls[c].markAsTouched();
}

if(this.formCategoriaEditable.valid){
  this.categoria2={
    "id":this.lsCategoriadto.id,
    "nombre": value.txtNombredg,
   "imagen": this.lsCategoriadto.imagen 
  
  }
  console.log("cat2",this.categoria2);


  this.categoriaService.update(this.categoria2).subscribe((res:any) => {
      if(res.success=false){
        this.idDialog = true; 
        this.messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Error Message',
          detail:
              res.message + ' ' + res.innerException,
      });
        return  

      }else{
        this.submitted = false;
        this.idDialog = false; 
        this.listarCategoria(this.req)
        this.messageService.add({
          key: 'tst',
          severity: 'info',
          summary: 'Confirmado',
          detail:
              res.message
      });
      }
    }

   )

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
  let file= this.uploadedFiles[0]
  let value = this.formCategoriaCrear.value
   for (let c in this.formCategoriaCrear.controls) {
    this.formCategoriaCrear.controls[c].markAsTouched();
}

if(this.formCategoriaCrear.valid){

  this.loadingc=true
  this.firebase.subirImagen("Categoria/",value.txtNombre,file)
  .then((url:any)=>{
    this.categoria2={
      "nombre": value.txtNombre,
      "imagen":url
      
      }
      this.loadingc=false

      this.categoriaService.crear(this.categoria2).subscribe((res:any) => {
        if(res.success=false){
          
        //  this.idDialogc = true; 
          this.messageService.add({
            key: 'tst',
            severity: 'error',
            summary: 'Error Message',
            detail:
                res.message + ' ' + res.innerException,
        });
          return  
  
        }else{
          this.submitted = false;
          this.idDialogc = false; 
          this.listarCategoria(this.req)
          this.messageService.add({
            key: 'tst',
            severity: 'info',
            summary: 'Confirmado',
            detail:
                res.message
        });
        }
      }
  
     )


  })
 

  

  
  }

 }

 async subirImagen(){
  let value = this.formCategoriaCrear.value
  let file= this.uploadedFiles[0]
  console.log(file);
  this.firebase.subirImagen("Categoria/",value.txtNombre,file)
  .then(url=>{

    console.log("Url Imagen",url);
  })
 }

 cambiarestado(event:any,item:any){
  this.lsCategoriadto=item;
 
  try {
    if(item.estado == 1){
    
      const req={
        id:item.id,
        estado:0
      }
      this.categoriaService.cambiarestado(req).subscribe((res:any)=>{
        if(res.success=false){

          console.log("error");
          return  
  
        }else{
    
          this.listarCategoria(this.req)
        }
      })
   
     
    }
    if(item.estado == 0){
      const req={
        id:item.id,
        estado:1
      }
      this.categoriaService.cambiarestado(req).subscribe((res:any)=>{
        if(res.success=false){
          console.log("error");
          
          return  
  
        }else{


          this.listarCategoria(this.req)

        }
      })
     
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}


leerimagenes2(event:any){

  this.uploadedFiles.splice(event.target.files);
  for(let file of event.target.files) {
    this.extraerBase64(file).then((imagen: any) => {
        this.lsCategoriadto.imagen = imagen.base
        this.uploadedFiles.push(imagen.base);
     });
 
  //  console.log(this.uploadedFiles);
}

this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
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
