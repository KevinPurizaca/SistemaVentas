import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpCoreService } from 'src/app/core/services/HttpCore.service';
import { Proveedor } from '../../Model/Proveedor';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  proveedor:Proveedor[]=[];
  totalRecord:number=0;
  loading:boolean=true;
  first:number=0;
  req={
    indice:0,
    limite:5,
    estado:-1
  }
  constructor(
    private httpCore:HttpCoreService,
    private messageService: MessageService, 
  ) { 

    this.loadaData(this.req)
  }

  ngOnInit() {
  }

  loadaData(req:any){
    this.httpCore.post(req,'Proveedor/Listar').subscribe((res)=>{
   
      if(!res.IsSuccess){
       // this.messageService.add({key:'tst', severity: 'error', 
        //summary: 'Error Message', detail:res.message+ '\n' + res.innerException})
       // return
      }

      this.proveedor = res.data;
      this.loading=false;
      this.totalRecord=res.totalregistro;


    })
  }

  edit(item:any){}
  eliminar(item:any){}
  cambiarEstado(event:any,item:any){}
  cambiarPagina(event:any){}

    res:any
  btn(){
  //  this.messageService.add({key:'tst', severity: 'error', summary: 'Error Message', detail:'Prueba' })

      // this.messageService.add({key: 'tst',severity: 'error',summary: 'Error Message',
      // detail:"res.message"});
    
 
   // console.log("res",this.res);
}

}
