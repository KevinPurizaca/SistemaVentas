import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

     //buscar producto
     search= new UntypedFormControl('')
     @Output('search') searchEmitter = new EventEmitter<string>();
     
   
   handleSearch(value:string){
       this.filtro_valor =value   
   
   }  
    filtro_valor='';
   
   isSideNavCollapsed=false;
   screenWidth = 0;
    onToggleSidenav(data:SideNavToggle):void{
     this.screenWidth = data.screenWidth;
     this.isSideNavCollapsed = data.collapsed;
    }

}
