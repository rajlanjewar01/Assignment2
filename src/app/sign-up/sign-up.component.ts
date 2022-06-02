import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private http: HttpClient, private router:Router ) { }

  ngOnInit(): void {
  }

  signupFrm = new FormGroup({
    name: new FormControl('' ,[
      Validators.required,
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    ]),
    phone: new FormControl('', [
      Validators.required,
      //Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    ])
  })

  onSubmit(){
    this.http.post<any>("http://localhost:3000/users",this.signupFrm.value)
    .subscribe(res => {
      alert("Signup success");
      this.signupFrm.reset();
      this.router.navigate(['sign-in']);
    },err=>{
      alert("signup fails");
    })
  }

}
