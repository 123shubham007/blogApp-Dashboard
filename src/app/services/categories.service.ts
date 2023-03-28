import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, collectionData } from '@angular/fire/firestore'
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  constructor(private firestore:Firestore, private toastr: ToastrService){}

  loadData():Observable<Category[]>{
    const data = collection(this.firestore, 'categories');
    return collectionData(data, { idField: 'id' }) as Observable<Category[]>
  }

  saveData(d: any){
    const data = collection(this.firestore, 'categories');
    addDoc(data, d).then(()=>{
      this.toastr.success('Data Insert Successfully!!!');
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  updateData( id : string, updateData : any ){
    const docInstance = doc(this.firestore, 'categories', id);
    updateDoc(docInstance,updateData).then(()=>{
      this.toastr.success('Data Edited Successfully!!!')
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  deleteData(id : string){
    const docInstance = doc(this.firestore, 'categories', id);
    deleteDoc(docInstance).then(()=>{
      this.toastr.success('Data Edited Successfully!!!')
    })
    .catch((err)=>{
      console.log(err);
    })
  }
}
