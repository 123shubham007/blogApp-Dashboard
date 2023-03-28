import { Injectable } from '@angular/core';
import { refFromURL } from '@angular/fire/database';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( 
    private store : Storage, 
    private firestore:Firestore, 
    private toastr: ToastrService, 
    private router:Router ) { }

  uploadImg(SelectediImg : any, postData : any, formStatus : string, id : any){

    const filePath = `postIMG/${Date.now()}`;
    const storageRef = ref(this.store, filePath);
    const uploadTask = uploadBytesResumable(storageRef, SelectediImg)
    uploadTask.on('state_changed',(snapshot)=>{},
    (error)=>{ console.log(error) },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((URL)=>{
        postData.postImgPath = URL;
        if(formStatus == 'Edit'){
          this.updateData(id, postData);
        }
        else{
          this.saveData(postData);
        }
      })
    });
  }

  saveData(postData:any){

    const data = collection(this.firestore, 'Post');
    addDoc(data, postData)
    .then(()=>{ this.toastr.success('Post Insert Successfully!!!'); })
    .catch((err)=>{ console.log(err); })
    this.router.navigate(['/post']);
  }

  loadData():Observable<Post[]>{

    const data = collection(this.firestore, 'Post');
    return collectionData(data, { idField: 'id' }) as Observable<Post[]>
  }

  updateData( id : string, updateData : any ){

    const docInstance = doc(this.firestore, 'Post', id);
    updateDoc(docInstance, updateData).then(()=>{
      this.toastr.success('Data Edited Successfully!!!')
    })
    .catch((err)=>{
      console.log(err);
    })
    this.router.navigate(['/post']);
  }

  deleteData(id : string, postImgPath : string){

    const refImg = ref(this.store,postImgPath);
    deleteObject(refImg)
    .then(()=>{})
    .catch((err)=>{
      console.log(err);
    });

    const docInstance = doc(this.firestore, 'Post', id);
    deleteDoc(docInstance)
    .then(()=>{
      this.toastr.warning('Post Deleted Successfully!!!')
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  markFeatured(id : string, featuredData : any){

    const docInstance = doc(this.firestore, 'Post', id);
    updateDoc(docInstance, featuredData).then(()=>{
      this.toastr.info('Featured Status Updated !!!')
    })
    .catch((err)=>{
      console.log(err);
    })
  }

}
