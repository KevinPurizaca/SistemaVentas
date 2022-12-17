import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService,ConfirmationService  } from 'primeng/api';
import { Producto } from 'src/app/vistasAdmin/Model/Producto';
import { ProductoService } from 'src/app/vistasAdmin/Services/Producto.service';
import { Categoria_Producto } from '../../Model/Categoria_Producto';

import { CategoriaproductoService } from '../../Services/Categoria_Producto.service';
import { ComboModel } from 'src/app/core/util/combo';
import { Marcaproducto } from '../../Model/MarcaProducto';
import { MarcaproductoService } from '../../Services/marcaproducto.service';

import { PrimeNGConfig } from 'primeng/api';
import { ProveedoresService } from '../../Services/Proveedores.service';
import { Proovedor } from '../../Model/Proveedor';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  styles: [`

`
],
  providers: [MessageService,ConfirmationService ]

})
export class ListarComponent implements OnInit {
 
  letrasPattern="[a-zA-Z ]*"
  numerosPattern="[0-9]*"
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  letrasynros="[a-zA-Z0-9 ]*"


  formBusqueda: FormGroup;
  formProductoEditable: FormGroup;
  loading=true
  bloqueado:boolean=true;
  pi:string=""
  loadingbtn=[false]

  totalRecord:number=0
  first:number=0
  stock=""
  idDialog:boolean=false;
  submitted: boolean = false;


  req={
    indice:0,
    limite:5

  }
  
  req2={
    indice:0,
    limite:10,
    id_estado:1

  }
  producto:Producto[]=[]
  categorias:Categoria_Producto[]=[]
  marca:Marcaproducto[]=[]
  proveedor:Proovedor[]=[]

  lsproductodto!:Producto;
  lstecatcb: ComboModel[]=[];
  lstmarcacb:ComboModel[]=[]

  producto2:Producto= new Producto()

  constructor(
    fb: FormBuilder,
    fbpe:FormBuilder,
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

  }

  


  ngOnInit() {
    this.primengConfig.ripple = true;

    this.getCategorias(this.req2)
    this.getMarca(this.req2)
   this.getProveedores(this.req)
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

  }

  editProducto(event: Event,item: any){
    this.lsproductodto =item;   
    this.submitted = false;
    this.idDialog = true;
   
  }

  cambiarestado(event:any,item:any){
    this.lsproductodto=item;
    console.log(item);
    try {
      if(item.estado == 1){
      
        const req={
          id:item.id,
          estado:0
        }
        this.productService.cambiarestado(req).subscribe((res:any)=>{
          if(res.success=false){

            console.log("error");
            return  
    
          }else{
      
            this.listarProducto(this.req)
          }
        })
     
       
      }
      if(item.estado == 0){
        const req={
          id:item.id,
          estado:1
        }
        this.productService.cambiarestado(req).subscribe((res:any)=>{
          if(res.success=false){
            console.log("error");
            
            return  
    
          }else{


            this.listarProducto(this.req)

          }
        })
       

      
        
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  
    
    
   console.log(item);
  }

changePage(event: any) {
  this.req.indice= event.first ;
  this.req.limite= event.rows;
 
  this.listarProducto(this.req);
  this.first = event.first;
}

listarProducto(req:any){
 
    this.productService.getProductoAll(req).subscribe((data:any)=>{
  

      if(!data){
        this.messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Error Message',
          detail:
          data.message + ' ' + data.innerException,
      });   
      return   
      }
      this.producto = data  
      this.loading= false;
      this.totalRecord = data[0].totalrecord;
 
    })


  
  
  }


    getCategorias(req:any){

      this.catService.getAll(req).subscribe(data=>{
        if(!data){
          return            
         }
      this.categorias = data   

      })
    }
    
    getMarca(req:any){
      this.marService.getAll(req).subscribe(data=>{
        if(!data){
          return
        }
     //   let result = data.filter(x=> x.estado ==1)
        this.marca=data
      })
    }

    getProveedores(req:any){
   
      this.provService.getAll(req).subscribe(data=>{
        if(!data){
          return
        }
      //  let result = data.filter(x=> x.estado==1)
        this.proveedor=data    

      })
    }

    hideDialog() {
      this.idDialog = false;
      this.submitted = false;
  }  

  actualizarProducto(req: any){

  this.submitted = true;
  this.idDialog = true;
   let value = this.formProductoEditable.value
   for (let c in this.formProductoEditable.controls) {
    this.formProductoEditable.controls[c].markAsTouched();
}

if(this.formProductoEditable.valid){
  this.producto2={
    "id":this.lsproductodto.id,
    "nombre": value.txtNombredg,
    "id_categoria":value.cboCategoriadg,//falta
    "id_marca":value.cboMarcadg,
    "id_proveedor":value.cboProveedordg,//falta
    "stock":value.txtStockdg,
    "precio":value.txtPreciodg,
  }


  this.productService.update(this.producto2).subscribe((res:any) => {
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
        this.listarProducto(this.req)
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

}

