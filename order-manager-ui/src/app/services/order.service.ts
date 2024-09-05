import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order, OrderDtoGetAll } from '../models/order.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private baseUrl: string = environment.baseURL + `/Orders`;

  http = inject(HttpClient);

  $orders = this.http.get<OrderDtoGetAll[]>(this.baseUrl);

  deleteOrder(id: number) { return this.http.delete<boolean>(`${this.baseUrl}/${id}`); }

  getOrderByIdAsync(id: number) { return this.http.get<Order>(`${this.baseUrl}/${id}`); }
  
  addOrderAsync(order: Order) { return this.http.post<Order>(this.baseUrl, order); }

}
