import { Injectable } from '@angular/core';
import Firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { environment } from 'src/environments/environment';
Firebase.initializeApp(environment.firebaseConfig)

@Injectable({
  providedIn: 'root'
})
export class SubirImagenesFirebaseService {


  storageRef = Firebase.app().storage().ref();
  storage= getStorage()
  
  pocentaje:string=""
constructor() { }
metadata = {
  contentType: 'image/jpeg'
};
async subirImagen(path:string,nombre:any, file:any){  
  try {
    //const storageRef=ref(this.storage,path+nombre)
   // const uploadTask = uploadBytesResumable(storageRef, file, this.metadata);

    let respuesta = await this.storageRef
                          .child(path+nombre)
                          .put(file,this.metadata)

   

  //  let progreso = respuesta.subscribe(data=>)

    return  await respuesta.ref.getDownloadURL() ;

    
    
  } catch (error) {
    console.log(error)
    return null;
  }

}

}
/*
metadata = {
  contentType: 'image/jpeg'
};
async subirImagen(path:string ,nombre:string, file:any){  
  try {
    const storageRef=ref(this.storage,path+nombre)
    const uploadTask = uploadBytesResumable(storageRef, file, this.metadata);
    
    uploadTask.on('state_changed',
    (snapshot)=>{
      const progreso =(snapshot.bytesTransferred / snapshot.totalBytes)*100;
      console.log('Upload is ' + progreso + '% done');

      switch (snapshot.state) {
        case 'paused':
          console.log('Subida esta en Pausa');
          break;
        case 'running':
          console.log('Subida esta Corriendo');
          break;
      }
    }

    , 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
   
      });
    }


   
    )
    
 
    // let respuesta = await this.storageRef
    //                       .child(path+nombre)
    //                       .put(file)

   
   // const progress =respuesta.bytesTransferred/ respuesta.totalBytes * 100;
  //  let progreso = respuesta.subscribe(data=>)
    
    // console.log('Upload is ' + progress + '% done');
    // return  await respuesta.ref.getDownloadURL() ;

    
    
  } catch (error) {
    console.log(error)
    return null;
  }

}



*/