import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService,ConfirmationService  } from 'primeng/api';
import { DescripcionProducto, Producto } from 'src/app/vistasAdmin/Model/Producto';
import { ProductoService } from 'src/app/vistasAdmin/Services/Producto.service';
import { Categoria_Producto } from '../../Model/Categoria_Producto';

import { CategoriaproductoService } from '../../Services/Categoria_Producto.service';
import { ComboModel } from 'src/app/core/util/combo';
import { Marcaproducto } from '../../Model/MarcaProducto';
import { MarcaproductoService } from '../../Services/marcaproducto.service';

import { PrimeNGConfig } from 'primeng/api';
import { ProveedoresService } from '../../Services/Proveedores.service';
import { Proveedor } from '../../Model/Proveedor';
import { HttpCoreService } from 'src/app/core/services/HttpCore.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SubirImagenesFirebaseService } from '../../Services/subirImagenesFirebase.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  styles: [`

`
],
  providers: [ConfirmationService ]

})
export class ListarComponent implements OnInit {
 //ESTE ES EL PROYECTO
  letrasPattern="[a-zA-Z ]*"
  numerosPattern="[0-9.,]*"
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  letrasynros="[a-zA-Z0-9 ]*";
  letrasyNrosPattern = "[ a-zA-ZáéíóúÁÉÍÓÚ0-9-._%%$·!&/()=·]*";

  acceptedFiles = '.jpeg,.jpg,.png,.webp,.jfif';
  uploadedFiles: any[] = [];
  httpHeaders: any;

  formBusqueda: FormGroup;
  formProductoEditable: FormGroup;
  formDescripcion: FormGroup;

  loading:boolean=true;
  loadinga:boolean=false;

  bloqueado:boolean=true;
  pi:string="";
  nombreProducto:string=""
  cboCategoria:ComboModel[]=[];

  totalRecord:number=0;
  first:number=0;
  stock="";
  idDialog:boolean=false;
  idDialogDesc:boolean=false;
  idDialogP:boolean=false;

  submitted: boolean = false;
  limite:number=5;

  verSubirImagenes:boolean=true;
  vCarpetaFirebase:string="";
  vCarpetaFirebaseMarca:string="";
  req={
    indice:0,
    limite:500,
    estado:-1,
    nombre:'',
    id_marca:-1,
    id_categoria:-1,
    id_proveedor:-1

  }
  
  req2={
    indice:0,
    limite:100,
    estado:-1

  }
  producto:Producto[]=[]
  categorias:ComboModel[]=[]
  marca:ComboModel[]=[]
  proveedor:Proveedor[]=[]

  lsproductodto!:Producto;
  lstDescripcion:DescripcionProducto=new DescripcionProducto;
  lstecatcb: ComboModel[]=[];
  lstmarcacb:ComboModel[]=[]

  producto2:Producto= new Producto()

  constructor(
    fb: FormBuilder,
    fbpe:FormBuilder,
    fbdesc:FormBuilder,
    private firebaseService:SubirImagenesFirebaseService,
    private sanitizer: DomSanitizer,
    private httpCore:HttpCoreService,
    private productService:ProductoService,
    private catService:CategoriaproductoService,
    private marService:MarcaproductoService,
    private provService:ProveedoresService,
    private primengConfig: PrimeNGConfig,
    private messageService:MessageService,
    private _confirmationService: ConfirmationService,
  ) { 


    
    this.formBusqueda = fb.group({

      cboCategoria: [-1],
      cboMarca: [-1],
      cboEstado: [-1],
      cboProveedor: [-1],
      txtNombre: ['',[Validators.pattern(this.letrasPattern)]],
    });

    this.formProductoEditable = fbpe.group({
      cboCategoriadg: [-1],
      cboMarcadg: [-1],
      cboProveedordg: [-1],
      txtNombredg: ['',[Validators.required]],
      txtPreciodg: ['',[Validators.required,Validators.pattern(this.numerosPattern)]],
      txtStockdg: ['',[Validators.required,Validators.pattern(this.numerosPattern)]],
    });
    this.formDescripcion = fbdesc.group({
      txtResumenDesc: ['',[Validators.required,Validators.pattern(this.letrasyNrosPattern)]],
      txtDesc_1: ['',[Validators.required,Validators.pattern(this.letrasyNrosPattern)]],
      txtDesc_2: ['',[Validators.required,Validators.pattern(this.letrasyNrosPattern)]],
      txtDesc_3: ['',[Validators.required,Validators.pattern(this.letrasyNrosPattern)]],
      txtDesc_4: ['',[Validators.required,Validators.pattern(this.letrasyNrosPattern)]],
      txtDesc_5: ['',[Validators.required,Validators.pattern(this.letrasyNrosPattern)]],
      txtDesc_6: ['',[Validators.required,Validators.pattern(this.letrasyNrosPattern)]],
      txtDesc_7: ['',[Validators.required,Validators.pattern(this.letrasyNrosPattern)]],
      txtDesc_8: ['',[Validators.required,Validators.pattern(this.letrasyNrosPattern)]],

    })

  }

  buscar(){
    const value = this.formBusqueda.value;

    const req ={
          indice:0,
          limite:5,
          estado:-1,
          id_marca: value.cboMarca,
          nombre:'',
          id_categoria:value.cboCategoria,
          id_proveedor:value.cboProveedor
    }
    console.log(req);
    console.log(value.cboMarca);
    this.listarProducto(req);
  } 


  ngOnInit() {
    this.primengConfig.ripple = true;

    this.getCategorias(this.req2)
    this.getMarca(this.req2)
   this.getProveedores(this.req2)
    this.listarProducto(this.req)
  }

  deleteProducto(){   
  }

  limpiarFormulario(){
    this.formBusqueda.controls['cboEstado'].setValue(-1);
    this.formBusqueda.controls['cboMarca'].setValue(-1);
    this.formBusqueda.controls['cboProveedor'].setValue(-1);
    this.formBusqueda.controls['cboCategoria'].setValue(-1);    
    this.formBusqueda.controls['txtNombre'].setValue('');

   // this.idDialogP=true;
   // this.listarProducto(this.req)
  }

  editProducto(event: Event,item: any){
    this.lsproductodto =item;   
    this.submitted = false;
    this.idDialog = true;
    this.verSubirImagenes=false;
   
  }

  cambiarestado(event:any,item:any){
    this.lsproductodto=item;

    const req={
      id:item.id,
      estado: (item.estado == 1 ? 0 : 1),
          }     

      this.httpCore.put(req,'Producto/ActualizarEstado').subscribe(res=>{
        if(!res.isSuccess){
          this.messageService.add({key: 'tst',severity: 'error',summary: 'Error Message',detail:res.message + ' ' + res.innerException});
          return
        }
        this.messageService.add({key: 'tst',severity: 'info',summary: 'Confirmado',detail:res.message,life:1000 ,closable:false });

        this.listarProducto(this.req);

      })   
          
   }

  

changePage(event: any) {
  this.req.indice= event.first ;
  this.req.limite= event.rows;
 
  this.listarProducto(this.req);
  this.first = event.first;
}

listarProducto(req:any){
 
  this.httpCore.post(req,'Producto/Listar').subscribe((res)=>{
    this.producto = res.data  
    this.loading= false;
    this.totalRecord = res.totalregistro;
})
  
  }


    getCategorias(req:any){
      this.httpCore.post(req,'Categorias/ListarCategoria').subscribe(res=>{
        if(!res.isSuccess){
          return
        }
        this.categorias.push({id:-1,nombre:'Seleccione'})
        this.categorias= this.categorias.concat(res.data)
      })
    }
    
    getMarca(req:any){
      this.marService.getAll(req).subscribe((res:any)=>{
    
        if(!res.isSuccess){
          return
        }
     //   let result = data.filter(x=> x.estado ==1)
      //  this.marca=res.data
      this.marca.push({id:-1,nombre:'Seleccione'})
      this.marca= this.marca.concat(res.data)
      })
    }

    getProveedores(req:any){
   
      this.provService.getAll(req).subscribe((res:any)=>{
        if(!res){
          return
        }
      //  let result = data.filter(x=> x.estado==1)
       // this.proveedor=res.data    
        this.proveedor.push({id:-1,nombrecompletos:'Seleccione'})
        this.proveedor= this.proveedor.concat(res.data)

      })
    }

    hideDialog() {
      this.idDialog = false;
      this.submitted = false;
      this.idDialogDesc=false;
      this.idDialogP=false;
  }  

  async pruebaFirebaseMultiple(){
    // let contador=0;
     var nombre="nombreProducto";
     let img1:any;
     let img2:any;    
     let img3:any;
     var urls:any=[];
     var req={   
       img1:'',
       img2:'',
       img3:''
     }
     for(let i=0;i<this.uploadedFiles.length;i++){
       this.firebaseService.subirImagen("extras/",nombre+i,this.uploadedFiles[i]).then((url:any)=>{ 
         urls.push(url);    
         if(urls.length==this.uploadedFiles.length)
         {
           req.img1= urls[0];
           req.img2=urls[1];
           req.img3= urls[2];
         }
   
       }
     )
     }
   }

nombreCategoria(event:any,item:any){
    let value = event.value;
    let filtro = item.filter((x:any)=> x.id == value);
    this.vCarpetaFirebase = filtro[0].vCarpetaFirebase;
}
nombreMarca(event:any,item:any){
  let value = event.value;
  let filtro = item.filter((x:any)=> x.id == value);
  this.vCarpetaFirebaseMarca = filtro[0].vCarpetaFirebase;
}

actualizarProducto(req: any){

  this.submitted = true;
  this.idDialog = true;
  var urls:any=[];


   let value = this.formProductoEditable.value
   for (let c in this.formProductoEditable.controls) {
    this.formProductoEditable.controls[c].markAsTouched();
}

if(this.formProductoEditable.valid){
  this.loadinga=true;
  this.producto2={
    "id":this.lsproductodto.id,
    "nombre": value.txtNombredg,
    "id_categoria":value.cboCategoriadg,
    "id_marca":value.cboMarcadg,
    "id_proveedor":value.cboProveedordg,
    "stock":value.txtStockdg,
    "precio":value.txtPreciodg,
    "imagen1":'',
    "imagen2":'',
    "imagen3":'',
  }
  if(this.lsproductodto.id ==0){
    let url =this.vCarpetaFirebase+"/"+this.vCarpetaFirebaseMarca+ "/"+value.txtNombredg+"/"+value.txtNombredg;
  

    for(let i=0;i<this.uploadedFiles.length;i++){
      this.firebaseService.subirImagen("Productos/"+url,value.txtNombredg+"_"+i,this.uploadedFiles[i]).then((url:any)=>{ 
        urls.push(url);    
        if(urls.length==this.uploadedFiles.length)
        {
          this.producto2.imagen1= urls[0];
          this.producto2.imagen2=urls[1];
          this.producto2.imagen3= urls[2];
          this.httpCore.post(this.producto2,'Producto/Crear/').subscribe(res=>{
            if(!res.isSuccess){
              this.idDialog = true; 
              this.messageService.add({key: 'tst', severity: 'error', summary: 'Error Message', detail: res.innerException, });
              this.loadinga=false;
              return
            }
            this.loadinga=false;
            this.submitted = false;
            this.idDialog = false; 
            this.listarProducto(this.req)
            this.messageService.add({ key: 'tst',  severity: 'info',  summary: 'Confirmado', detail:res.message });
          })
        }
  
      }
    )
    }


  }
  else if(this.lsproductodto.id !=0){

    this.httpCore.post(this.producto2,'Producto/Actualizar/').subscribe(res=>{
      if(!res.isSuccess){
        this.idDialog = true; 
        this.messageService.add({key: 'tst', severity: 'error', summary: 'Error Message', detail: res.innerException, });
        this.loadinga=false;
        return  
      }
      else{
        this.submitted = false;
        this.idDialog = false; 
        this.loadinga=false;
        this.listarProducto(this.req)
        this.messageService.add({ key: 'tst',  severity: 'info',  summary: 'Confirmado', detail:res.message });
      }
    })
  }
  else{
    this.messageService.add({key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Error al momento de Registrar o Actualizar', });

  }



}
}

eliminarProducto(event: Event, item: any) {
  this._confirmationService.confirm({
      key: 'deleteProducto',
      target: event.target || new EventTarget(),
      message: 'Desea eliminar el Producto?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          if (item > 0) {
            console.log(item);
              this.productService.delete(item)
                  .subscribe((res: any) => {
                      if (res.success=false) {
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
                          this.listarProducto(this.req)
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

registrarProducto(){
  this.idDialog=true;
  this.lsproductodto={};
  this.lsproductodto.id = 0;
  this.verSubirImagenes=true;

}

verDescripcion(item:any){
  this.idDialogDesc=true;
  this.nombreProducto= ''+item.nombre;
  const req={
    id:item.iidDesc,
    indice:0,
    limite:100
  }
  this.httpCore.post(req,'Producto/ListarDescripcion').subscribe(res=>{
    if(!res.isSuccess){
      return
    }
    this.lstDescripcion = res.data[0];
    // this.lstDescripcion.vResumen = res.data[0].vResumen; 
    // this.lstDescripcion.vDesc_1 = res.data[0].vDesc_1;
    // this.lstDescripcion.vDesc_2 = res.data[0].vDesc_2;
    // this.lstDescripcion.vDesc_3 = res.data[0].vDesc_3;
    // this.lstDescripcion.vDesc_4 = res.data[0].vDesc_4;
    // this.lstDescripcion.vDesc_5 = res.data[0].vDesc_5;
    // this.lstDescripcion.vDesc_6 = res.data[0].vDesc_6;
    // this.lstDescripcion.vDesc_7 = res.data[0].vDesc_7;
    // this.lstDescripcion.vDesc_8 = res.data[0].vDesc_8;

  })
}
editarRegistrarDescripcion(){
  const req={
    iidDesc:this.lstDescripcion.iidDesc,
    vResumen:this.lstDescripcion.vResumen,
    vDesc_1:this.lstDescripcion.vDesc_1 ,
    vDesc_2:this.lstDescripcion.vDesc_2,
    vDesc_3:this.lstDescripcion.vDesc_3,
    vDesc_4:this.lstDescripcion.vDesc_4,
    vDesc_5:this.lstDescripcion.vDesc_5,
    vDesc_6:this.lstDescripcion.vDesc_6,
    vDesc_7:this.lstDescripcion.vDesc_7,
    vDesc_8:this.lstDescripcion.vDesc_8,
  }
  this.httpCore.post(req,'Producto/CrearDescripcion').subscribe(res=>{
    if(!res.isSuccess){
      this.messageService.add({key: 'tst',severity: 'error',summary: 'Error Message',detail:res.message + ' ' +res.innerException});
      return
    }
    this.messageService.add({key: 'tst',severity: 'info',summary: 'Confirmado',detail:res.message});


  })
}


borrarImagenes(event:any){ 
  let file = event.file;
  var indice = this.uploadedFiles.indexOf(file); 
  this.uploadedFiles.splice(indice, 1);   

}
leerimagenes(event:any){
  for(let file of event.files) {
            this.uploadedFiles.push(file);   
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


