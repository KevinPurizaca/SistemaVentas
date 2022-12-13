import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DescripcionProducto } from 'src/app/vistasAdmin/Model/DescripcionProducto';
import { DescripcionproductoService } from 'src/app/vistasAdmin/Services/descripcionproducto.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers:[MessageService,ConfirmationService]
})
export class ListarComponent implements OnInit {

  detalleProducto:DescripcionProducto[]=[]
  loading=true
  totalRecord=0
  constructor(
    private detaProducService:DescripcionproductoService
  ) { }

  ngOnInit() {
    this.listarDetalleProductos()
  }
listarDetalleProductos(){
  this.detaProducService.getDescProductoAll().subscribe(data=>{
    if(!data){
      return
    }
    this.detalleProducto = data;
    this.totalRecord = data.length;
    this.loading = false

  })

}


  deleteDetalleProducto(){}
  editDetalleProducto(){}
  changePage(){}
}
