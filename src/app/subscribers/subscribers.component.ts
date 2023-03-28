import { Component } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Sub } from '../models/sub';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent {

  userData !: any

  constructor(private firestore:Firestore, private toastr: ToastrService){

    const data = collection(this.firestore, 'Subscribers');
    collectionData(data, { idField: 'id' }).subscribe(val=>{
      this.userData = val;
    })
  }

  onDelete(id : string){
    const docInstance = doc(this.firestore, 'Subscribers', id);
    deleteDoc(docInstance).then(()=>{
      this.toastr.warning('Subscriber removed')
    })
    .catch((err)=>{
      console.log(err);
    })
  }

}
