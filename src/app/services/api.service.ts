import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "http://localhost:3000";

  constructor( private http: HttpClient ) { }

  postUser(data: any){
    return this.http.post<any>("http://localhost:3000/users/", data)
  }

  getUser(){
    return this.http.get<any>("http://localhost:3000/users/")
  }

  putUser(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/users/" + id, data)
  }

  deleteUser(id: number){
    return this.http.delete<any>("http://localhost:3000/users/" + id)
  }

  addPost(data: any){
    return this.http.post<any>(`${this.url}/posts/`, data);
  }

  getAllPost(){
    return this.http.get<any>(`${this.url}/posts/`);
  }

  putPost(data: any, id: number){
    return this.http.put<any>(`${this.url}/posts/` + id, data);
  }

  deletePost(id: number){
    return this.http.delete<any>(`${this.url}/posts/` + id);
  }
  
}
