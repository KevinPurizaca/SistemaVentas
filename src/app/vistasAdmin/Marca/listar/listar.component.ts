import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { PrimeNGConfig, MessageService, ConfirmationService } from 'primeng/api';
import { Marcaproducto } from '../../Model/MarcaProducto';
import { MarcaproductoService } from '../../Services/marcaproducto.service';
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
  totalRecord:number=0;

  formMarcaEditable: FormGroup;
  formMarcaCrear: FormGroup;

  marca:Marcaproducto[]=[];
  lsMarcadto!:Marcaproducto;

  marca2:Marcaproducto= new Marcaproducto();

  acceptedFiles = '.jpeg,.jpg,.png,.webp,.jfif';
  uploadedFiles: any[] = [];
  httpHeaders: any;

  req={
    indice:0,
    limite:5,
    estado:-1
  }

  constructor(

    private marcaService:MarcaproductoService,
    fbpe:FormBuilder,
    private primengConfig: PrimeNGConfig,
    private messageService:MessageService,
    private _confirmationService: ConfirmationService,
    private firebase:SubirImagenesFirebaseService,
    private sanitizer: DomSanitizer,
  ) {

    this.formMarcaEditable = fbpe.group({
        txtNombredg: ['',[Validators.required]],
       
      });
      this.formMarcaCrear = fbpe.group({
            txtNombre: ['',[Validators.required]],
       
       
      });
   }

  ngOnInit() {
    this.loadData(this.req)
  }

  loadData(req:any){
    this.marcaService.getAll(req).subscribe((data:any)=>{
      if(!data){
        return
      }
      this.marca = data;
      this.loading =false;
      this.totalRecord = data[0].totalrecord;
    })
    
  }

  cambiarPagina(event:any){
    this.req.indice= event.first ;
    this.req.limite= event.rows;
   
    this.loadData(this.req);
    this.first = event.first;
  }

  leerimagenes2(event:any){

    this.uploadedFiles.splice(event.target.files);

    for(let file of event.target.files) {
      this.extraerBase64(file).then((imagen: any) => {
          this.lsMarcadto.imagen = imagen.base
          this.uploadedFiles.push(imagen.base);
       });
      }
  this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  leerimagenes(event:any){
    this.uploadedFiles.splice(event.files);
    for(let file of event.files) {
              this.uploadedFiles.push(file);    
  
  }
  }

  hideDialog(){
    this.idDialog = false;
    this.submitted = false;
    this.idDialogc = false;
  }
  
  crear(){
    this.submitted = false;
    this.idDialogc = true;
  }

  crearMarca(){  this.submitted = true;
  let file= this.uploadedFiles[0]
  let value = this.formMarcaCrear.value
   for (let c in this.formMarcaCrear.controls) {
    this.formMarcaCrear.controls[c].markAsTouched();
}

if(this.formMarcaCrear.valid){
  this.loadingc=true
  this.firebase.subirImagen("Marcas/",value.txtNombre,file)
  .then((url:any)=>{
    this.marca2={
  //    "id":value.txtId,
      "nombre": value.txtNombre,
      "imagen":url
      
      }
      this.loadingc=false

      this.marcaService.crear(this.marca2).subscribe((res:any) => {
        if(res.success=false){
          
          this.idDialogc = true; 
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
          this.loadData(this.req)
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
cambiarImg(){}

  actualizar(event:any){}

  eliminarMarca(event:Event,item:any){
    this._confirmationService.confirm({
      key: 'deleteMarca',
      target: event.target || new EventTarget(),
      message: 'Desea eliminar Este Registro?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          if (item > 0) {
              this.marcaService.delete(item)
                  .subscribe((res: any) => {
                      if (res.success==false) {
                          this.messageService.add({
                              key: 'tst',
                              severity: 'error',
                              summary: 'Error Message',
                              detail:
                                  res.message,
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
                          this.loadData(this.req)
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
    })
  }
  
  editarMarca(event:any,item:any){
    this.lsMarcadto =item;
    let value = item

    this.submitted = false;
    this.idDialog = true;
  }

  cambiarEstado(event:any,item:any){
    this.lsMarcadto = item;

    try {
      if(item.estado == 1){
        const req={
          id:item.id,
          estado:0
        }
      this.marcaService.cambiarestado(req).subscribe((res:any)=>{

        if(res.success=false){

          console.log("error");
          return  
  
        }else{
    
          this.loadData(this.req)
        }
      })

      }

      if(item.estado == 0){
        const req={
          id:item.id,
          estado:1
        }
        this.marcaService.cambiarestado(req).subscribe((res:any)=>{
          if(res.success=false){
            console.log("error");
            
            return  
    
          }else{
  
  
            this.loadData(this.req)
  
          }
        })
       
      }
      
    } catch (error) {
      console.log(`Error: ${error}`);
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
