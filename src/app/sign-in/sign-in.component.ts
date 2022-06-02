import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { find } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  signInFrm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  onSubmit(){
    this.http.get<any>("http://localhost:3000/users")
    .subscribe(res => {
      const user = res.find( (a: any) => {
        return a.email === this.signInFrm.value.email  && a.password === this.signInFrm.value.password;
      });

      if(user){
        alert("login success");
        this.signInFrm.reset();
        this.router.navigate(['registered-user'])
      }
      else{
        alert("user not founds");
      }
      this.signInFrm.reset();
    },err => {
      alert("login fails");
    }
    )
  }



}
