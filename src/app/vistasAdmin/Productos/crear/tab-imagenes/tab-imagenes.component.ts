import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-imagenes',
  templateUrl: './tab-imagenes.component.html',
  styleUrls: ['./tab-imagenes.component.css']
})
export class TabImagenesComponent implements OnInit {
  acceptedFiles = '.jpeg,.jpg,.png';
  uploadedFiles: any[] = [];
  httpHeaders: any;
  subir:string=""
  constructor() { }

  ngOnInit() {
    console.log("tab IMAGENES");
  }
  capturarimg(event: any) {
    const archivoCapturado = event.target.files[0];
  
    //primero elimino la imagen existente
    this.uploadedFiles.splice(archivoCapturado);
    //despues agrego el archivo capturado
    this.uploadedFiles.push(archivoCapturado);
    console.log(this.uploadedFiles);
  }

}
