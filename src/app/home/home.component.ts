import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddPostComponent } from '../add-post/add-post.component';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../services/api.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'description', 'date', 'visiblity', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  response: any = [];

  constructor(public dialog: MatDialog, private api: ApiService) {
    this.fetchAllPost();
  }

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(AddPostComponent,{
      width: '40%',
    });
  }

  fetchAllPost(){
    this.api.getAllPost()
    .subscribe({
      next: (response) => {
        console.log(response);
        // this.dataSource = new MatTableDataSource(response);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        this.response = response;
      },
      error:(err) => {
        console.log("Fails to retrive post data" + err);
      }
    })
  }

  editPost(post: any){
    this.dialog.open(AddPostComponent, {
      width: '40%',
      data: post,
    }).afterClosed().subscribe( val => {
      if(val === 'update'){
        this.fetchAllPost();
      }
    })
  }

  deletePost(id: number){
    if(confirm("Do you really want to delete this post?")){
      this.api.deletePost(id)
    .subscribe({
      next: (res) => {
        console.log(res);
        alert("Post deleted success ✔");
        this.fetchAllPost();
      },
      error: (err) => {
        console.log(err);
        alert("Fails to delete post");
      }
    })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
