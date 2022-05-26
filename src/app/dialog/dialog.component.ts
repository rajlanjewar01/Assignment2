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

  actionBtn: string = "Save";
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

    if(this.editData){
      this.actionBtn = "Update";
      this.userFrm.controls['name'].setValue(this.editData.name);
      this.userFrm.controls['email'].setValue(this.editData.email);
      this.userFrm.controls['phone'].setValue(this.editData.phone);
      this.userFrm.controls['password'].setValue(this.editData.password);
      this.userFrm.controls['confirmPassword'].setValue(this.editData.confirmPassword);
    }
  }

  postUser(){
    if(!this.editData){
      if(this.userFrm.valid){
        this.api.postUser(this.userFrm.value)
        .subscribe({
          next:(res)=>{
            alert("User added success");
            this.userFrm.reset();
            this.dialogRef.close('save');
          },
          error(err){
            alert("Fails to add user data");
          }
        })
      }
    }else{
      this.updateUser();
    }
  }

  //update data
  updateUser(){
    this.api.putUser(this.userFrm.value, this.editData.id)
    .subscribe({
      next:(res)=> {
        alert("User details updated success");
        this.userFrm.reset();
        this.dialogRef.close("update");
      },
      error(err){
        alert("Error in user update");
      }
    })
  }

}
