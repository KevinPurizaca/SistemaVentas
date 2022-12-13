import { Injectable } from "@angular/core";

   
   @Injectable()
   export class UtilService {

    constructor() {}

   public  base64ToArrayBuffer = (base64: any) => {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    };

   }
   
