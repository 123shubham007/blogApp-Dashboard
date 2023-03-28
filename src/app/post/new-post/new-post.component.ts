import { Component } from '@angular/core';
import { doc, Firestore, getDocFromServer } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  categoryArray !: Array<any> //store category
  permalink : string = '';
  imgSrc : any = './assets/default.png';
  selectImg : any;
  postForm !: FormGroup;
  post!: any; //store single post
  formStatus : string = 'Add New';
  postId : any; //capture id of the post

  constructor( 
    private categoryService: CategoriesService, 
    private fb:FormBuilder, 
    private postService: PostsService, 
    private router:ActivatedRoute,
    private firestore:Firestore
    ){
    this.loadCategory();

//get post data using id from firebase
    this.router.queryParams.subscribe(async val=>{
      this.postId = val.id;
      if(this.postId){
        const docRef = doc(this.firestore, "Post", this.postId)
        const docSnap = await getDocFromServer(docRef);
        this.post = docSnap.data();
  
        this.postForm = this.fb.group({
          title: [this.post.title, [Validators.required, Validators.minLength(10)]],
          permalink: [this.post.permalink],
          excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
          category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
          postImg: ['', Validators.required],
          content: [this.post.content, Validators.required]
        });
        this.imgSrc = this.post.postImgPath;
        this.formStatus = 'Edit';
      }
      else{
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: [''],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required]
        });
      }
      
    })
    
  }

//form validation
  get fc(){
    return this.postForm.controls;
  }

//load category in select section
  loadCategory(){
    this.categoryService.loadData().subscribe((res:Category[])=>{
      this.categoryArray = res;
    });
  }

  onTitleChange($event : any){
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

//show the selected image
  showPreview($event: any){
    const reader = new FileReader();
    reader.onload = (e)=>{
      this.imgSrc = e.target?.result;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectImg = $event.target.files[0];
  }

//save post in firebase
  onSubmitPost(){
    let split = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.permalink,
      category: {
        categoryId: split[0],
        category: split[1]
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    this.postService.uploadImg(this.selectImg, postData, this.formStatus, this.postId);
    this.postForm.reset();
    this.imgSrc = './assets/default.png';
    this.permalink = '';
  }

}
