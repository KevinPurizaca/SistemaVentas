import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Orders } from 'src/app/vistasAdmin/Model/orders';
import { OrderService } from 'src/app/vistasAdmin/Services/order.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers:[MessageService,ConfirmationService]
})
export class ListarComponent implements OnInit {

  loading=true
  totalRecord=0
  ventas:Orders[]=[]
  constructor(
    private orderService:OrderService
  ) { }

  ngOnInit() {
    this.listar()
  }
  listar(){
    this.orderService.getAll().subscribe(data=>{
      if(!data){
        return
      }
      this.ventas = data;
      this.totalRecord= data.length;
      this.loading=  false;
      console.table(data);
    })
  }
  verDetalles(){}
  cambiarPagina(){}
}
