import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  userFrm: any = FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {

    this.userFrm = new FormGroup({
      name: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/),
        Validators.minLength(6),
        Validators.maxLength(18)
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
      ]),
      phone: new FormControl('',[
        Validators.required,
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      ]),
      confirmPassword: new FormControl('',[
        Validators.required,
      ]),
    });

  }

  add(){

  }

}
