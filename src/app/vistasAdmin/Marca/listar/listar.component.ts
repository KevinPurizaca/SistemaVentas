import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { PrimeNGConfig, MessageService, ConfirmationService } from 'primeng/api';
import { HttpCoreService } from 'src/app/core/services/HttpCore.service';
import { UtilService } from 'src/app/core/util/util.services';
import { Marcaproducto } from '../../Model/MarcaProducto';
import { MarcaproductoService } from '../../Services/marcaproducto.service';
import { SubirImagenesFirebaseService } from '../../Services/subirImagenesFirebase.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ConfirmationService ]
})
export class ListarComponent implements OnInit {


  loading=true;
  loadingc=false;
  loadinge:boolean=false;

  idDialog:boolean=false;
  idDialogc:boolean=false;

  urlImagen:string="";

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
    iexportar:0,
    estado:-1
  }

  constructor(

    private marcaService:MarcaproductoService,
    fbpe:FormBuilder,
    private primengConfig: PrimeNGConfig,
    private messageService:MessageService,
    private httpCoreService:HttpCoreService,
    private _confirmationService: ConfirmationService,
    private firebase:SubirImagenesFirebaseService,
    private sanitizer: DomSanitizer,
    private _utilService :UtilService,
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

    this.httpCoreService.post(req,'Marca/Listar').subscribe(res=>{
      this.marca = res.data;
      this.loading= false;
      this.totalRecord = res.totalregistro;
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
          this.uploadedFiles.push(file);
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

async  crearMarca(){  
    this.submitted = true;
  let file= this.uploadedFiles[0]
  let value = this.formMarcaCrear.value
   for (let c in this.formMarcaCrear.controls) {
    this.formMarcaCrear.controls[c].markAsTouched();
}

if(this.formMarcaCrear.valid){
  this.loadingc=true
  this.firebase.subirImagen("Marcas/",value.txtNombre,file)
  .then((url:any)=>{
    const req={
      iidMarca:0,
      vNombre: value.txtNombre,
      vImagen:url      
      }
      this.loadingc=false
      this.httpCoreService.post(req,'Marca/RegistrarMarca').subscribe(res=>{
      if(!res.isSuccess){
        this.idDialogc = true; 
        this.messageService.add({key: 'tst',severity: 'error',summary: 'Error Message',detail:res.message + ' ' + res.innerException});
        return
      }
      this.submitted = false;
      this.idDialogc = false; 
      this.loadData(this.req)
      this.messageService.add({key: 'tst',severity: 'info',summary: 'Confirmado',detail:res.message});
      });
    })
    }
}

cambiarImg(){}

async actualizar(event:any){
  this.submitted = true;

  if(this.formMarcaEditable.valid){
    let file = this.uploadedFiles[0];
    this.loadinge=true;
    this.submitted = false;

    let url = this.urlImagen;

    if(this.lsMarcadto.imagen == url )
    {
        const req ={          
          iidMarca:this.lsMarcadto.id ,
          vNombre: this.lsMarcadto.nombre ,
          vImagen:url     
        }
        this.httpCoreService.post(req,'Marca/RegistrarMarca').subscribe(res=>{
          if(!res.isSuccess){
            this.idDialog = true; 
            this.loadinge=false;
            this.messageService.add({key: 'tst',severity: 'error',summary: 'Error Message',detail:res.message + ' ' + res.innerException});
            return
          }
          this.submitted = false;
          this.loadinge=false;
          this.idDialog = false; 
          this.loadData(this.req)
          this.messageService.add({key: 'tst',severity: 'info',summary: 'Confirmado',detail:res.message});
          });
    }
    else if(this.lsMarcadto.imagen != url)
    {
      
      this.firebase.subirImagen("Marcas/",this.lsMarcadto.vCarpetaFirebase,file).then((url:any)=>
      {
         if(url){
          const req ={  
            iidMarca:this.lsMarcadto.id ,
            vNombre: this.lsMarcadto.nombre ,
            vImagen:url     
          }
        //  console.log('req: ', req);
      this.httpCoreService.post(req,'Marca/RegistrarMarca').subscribe(res=>{
        if(!res.isSuccess)
        {
          this.loadinge=false;
          this.idDialog = true; 
          this.messageService.add({key: 'tst',severity: 'error',summary: 'Error Message',detail:res.message + ' ' +res.innerException});
          return   
        }
        this.submitted = false;
        this.idDialog = false; 
        this.loadinge=false;
        this.loadData(this.req)
        this.messageService.add({key: 'tst',severity: 'info',summary: 'Confirmado',detail:res.message});
     
      })
         }
    
         else{
          this.loadinge=false;
          this.messageService.add({key: 'tst',severity: 'error',summary: 'Error Message',detail:'Error al Subir la Imagen a Firebase.'});
      }
     }
      )
    }
  }

}

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
    this.urlImagen = item.imagen;
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

exportarExcel(){
  this.loadinge=true;
  const req = {
    iidDescuento:-1,

    iexportar:1,
    iidAprobador:-1,
    pageNum:0,
    pageSize:1000000,
}
this.httpCoreService.post(req,'/BandejaDescuentos/GetListHistorialBandejaDescuentos').subscribe(res => {
    
  if (!res.isSuccess) {
    this.loadinge=false;
    this.messageService.add({key:'tst',severity:'error', summary:'Error', detail:'Algo Fallo', icon: 'pi-file'});
  return;
  }    
     let file = res.file;
     if (file != null && file != undefined) {
         let p_file = this._utilService.base64ToArrayBuffer(file);
         var blob = new Blob([p_file], {
             type: 'application/vnd.ms-excel'
         });
         var link = document.createElement("a");
         link.href = window.URL.createObjectURL(blob);
         link.download = res.informacion;
         link.click();
         this.loadinge=false;
     } else {
         
         this.loadinge=false;
         this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail:res.message +' '+ res.innerException });return;
     }
     
 })
}
}
