import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  constructor(  @Inject('apiUrl') private apiUrl: string, private http: HttpClient) { }

  getList() {
    return this.http.get(`${this.apiUrl}/products/getlist`);
  }
}
