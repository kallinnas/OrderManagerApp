import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OrderDtoGetAll } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private baseUrl: string = `https://localhost:7071/api/Orders`;

  http = inject(HttpClient);

  $orders = this.http.get<OrderDtoGetAll[]>(this.baseUrl);

  deleteOrder(id: number) { return this.http.delete<boolean>(`${this.baseUrl}/${id}`); }
}
