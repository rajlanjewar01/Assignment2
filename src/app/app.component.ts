import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  displayedColumns: string[] = ['id','name','email','phone','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'Assignment2';

  constructor(private api: ApiService, private dialog: MatDialog ){}
  
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
        // console.log(res);
      },
      error:(err) => {
        alert("Failed to retrive user data");
      }
    })
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
    let result = confirm("Want to delete?");
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
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }


}
