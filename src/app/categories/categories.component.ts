import { Component } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categoryArray !: Array<any>
  formCategory !: string;
  formStatus : string = 'Add';
  categoryId !: string;

  constructor(private categoryService : CategoriesService){
    this.categoryService.loadData().subscribe((res:Category[])=>{
      this.categoryArray = res;
    });
  }

  ngOnInit():void{}

  onSubmit(formData: any){
    let data : Category = {
      category : formData.value
    }
    if(this.formStatus == 'Add'){
      this.categoryService.saveData(data.category);
      formData.reset();
    }else if(this.formStatus == 'Edit'){
      this.categoryService.updateData(this.categoryId,data.category);
      formData.reset();
      this.formStatus = 'Add';
    }
  }

  onEdit(category : any, id : string){
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id : string){
    this.categoryService.deleteData(id);
  }
}
