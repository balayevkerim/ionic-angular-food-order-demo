import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}
  private basketUpdated = new Subject<void>();
  basketUpdated$ = this.basketUpdated.asObservable();

  updateBasket() {
    this.basketUpdated.next();
  }

  getList() {
    return this.http.get(`${this.apiUrl}/baskets/getlist`);
  }

  addToBasket(product: Product) {
    const basket = {
      id: 0,
      productId: product.id,
      quantity: product.quantity,
    };
    return this.http.post(`${this.apiUrl}/baskets/add`, basket);
  }
}
