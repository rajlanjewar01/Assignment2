import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-published-post',
  templateUrl: './published-post.component.html',
  styleUrls: ['./published-post.component.css']
})
export class PublishedPostComponent implements OnInit {
  posts: any  = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllPost().subscribe(res=>this.posts = res);
  }

  // fetchPublishedPost(){
  //   this.posts = this.api.getAllPost()
  //   .subscribe({
  //     next: (response) => {
  //       console.log("fetched success");
  //       this.posts = response;
  //     },
  //     error: (err) => {
  //       alert("Fails to load posts");
  //     }
  //   })
  // }

}
