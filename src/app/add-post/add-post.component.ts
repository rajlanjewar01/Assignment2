import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  actionBtn: string = "Save";

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddPostComponent>,
    ) { }

  ngOnInit(): void {
    // console.log(this.editData);
    if(this.editData){
      this.actionBtn = "Update";
      this.addPostFrm.controls['title'].setValue(this.editData.title);
      this.addPostFrm.controls['description'].setValue(this.editData.description);
      this.addPostFrm.controls['date'].setValue(this.editData.date);
      this.addPostFrm.controls['visiblity'].setValue(this.editData.visiblity);
    }
  }

  addPostFrm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    visiblity: new FormControl('',[
      Validators.required
    ]),
    date: new FormControl('',[
      Validators.required
    ])
  })

  addPost(){
    if(!this.editData){
      //add data
      if(this.addPostFrm.valid){
        // console.log(this.addPostFrm.value);
        this.api.addPost(this.addPostFrm.value)
        .subscribe({
          next:(response) => {
            console.log(response);
            alert("Post added success 👍");
            this.addPostFrm.reset();
            this.dialogRef.close();
          },
          error:(err) => {
            console.log(err);
            alert("Fails to add post");
          }
        })
      } 
    }else{
      //update data
      this.updatePost();
    }
  }


  updatePost(){
    this.api.putPost(this.addPostFrm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        console.log(res);
        alert("Post Updated success ✔");
        //reset form
        this.addPostFrm.reset();
        //close form
        this.dialogRef.close("update");
      },
      error: (err) => {
        console.log(err);
        alert("Fails to update Post");
      }
    })
  }


}
