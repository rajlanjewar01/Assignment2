import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private api: ApiService, private dialog: MatDialog ){}
  
  ngOnInit(): void {
    // this.getAllUsers();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "60%"
    }).afterClosed().subscribe(val => {
      if(val === "save"){
        // this.getAllUsers();
      }
    })
  }

}
