export class Producto {
    id?:number=0;
    id_categoria?:number=0;
    id_marca?:number=0;
    marca?:string="";
    nombre?:string="";
  //  resumen?:string="";
    precio?:string="";
    imagen1?:string="";
    imagen2?:string="";
    imagen3?:string="";
    stock?:number=0;
    estado?:number=0;
    fecha_creada?:any;
    fecha_actualizada?:any; 
    id_proveedor?:number=0;   

    }

export class DescripcionProducto
 {
    iidDesc?:number;
    iidProducto?:number;
    vNombreProducto?:string;
    vResumen?:string;
    vDesc_1?:string="";
    vDesc_2?:string="";
    vDesc_3?:string="";
    vDesc_4?:string="";
    vDesc_5?:string="";
    vDesc_6?:string="";
    vDesc_7?:string="";
    vDesc_8?:string="";
    fecha_creada?:any;
    fecha_actualizada?:any; 
  
  }
