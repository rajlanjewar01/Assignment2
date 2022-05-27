import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-registered-user',
  templateUrl: './registered-user.component.html',
  styleUrls: ['./registered-user.component.css']
})
export class RegisteredUserComponent implements OnInit {
  displayedColumns: string[] = ['id','name','email','phone','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "60%"
    }).afterClosed().subscribe(val => {
      if(val === "save"){
        this.getAllUsers();
      }
    })
  }

    //get all user data
    getAllUsers(){
      this.api.getUser()
      .subscribe({
        next:(res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(err) => {
          alert("Failed to retrive user data");
        }
      })
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
    }


  //edit users data
  editUser(value: any){
    //console.log(value); //get current value
    this.dialog.open(DialogComponent, {
      width:"40%",
      data: value
    }).afterClosed().subscribe(val =>{
      if(val === "update"){
        this.getAllUsers();
      }
    })
  }

  //delete user
  deleteUser(id: number){
    let result = confirm("Are you sure?");
    if(result){
      this.api.deleteUser(id)
    .subscribe({
      next:(res)=>{
        alert("deleted success");
        this.getAllUsers();
      },
      error:(err) => {
        alert("fails to delete" + err);
      }
    });
    }
  }
  
}
