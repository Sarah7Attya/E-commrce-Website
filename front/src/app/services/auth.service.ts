import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public serverUrl: string = 'http://localhost:3000';
  public isLogin: boolean = false;
  public isAdmin: boolean = false;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.getUser().subscribe(res => {
        this.isAdmin = res.data.isAdmin
      })
    }
  }

  register(obj: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/user/register`, obj);
  }
  login(obj: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/user/login`, obj);
  }
  logout(): Observable<any> {
    return this.http.get(`${this.serverUrl}/user/logout`);
  }
  getAllproducts(): Observable<any> {
    return this.http.get(`${this.serverUrl}/products`);
  }
  addProducts(obj: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/products/addnew`, obj);
  }
  updateProducts(obj: any, id: any): Observable<any> {
    return this.http.put(`${this.serverUrl}/products/update/${id}`, obj);
  }
  deleteProducts(id: any): Observable<any> {
    return this.http.delete(`${this.serverUrl}/products/delete/${id}`);
  }
  createCart(obj: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/cart/create`, obj);
  }
  getUser(): Observable<any> {
    return this.http.get(`${this.serverUrl}/user/me`);
  }
  getUsers(): Observable<any> {
    return this.http.get(`${this.serverUrl}/user/find`);
  }
  delUser(id:any): Observable<any> {
    return this.http.delete(`${this.serverUrl}/user/${id}`);
  }
}
