import { Component } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent {
  postArray !: Array<any>

  constructor( private postService: PostsService ){
    this.loadPost();
  }

  loadPost(){
    this.postService.loadData().subscribe((res:Post[])=>{
      this.postArray = res;
    });
  }

  onDelete(id : string, postImgPath : string){
    this.postService.deleteData(id,postImgPath);
  }

  onFeatured(id:string, value:boolean){
    const featuredData = {
      isFeatured : value
    }
    this.postService.markFeatured(id, featuredData);
  }

}
