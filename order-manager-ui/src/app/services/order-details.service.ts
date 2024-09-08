import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrderDetails } from '../models/order-details.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  private baseUrl: string = environment.baseURL + `/OrderDetails`;

  private http = inject(HttpClient);

  getOrderDetailsByIdAsync(id: number) { return this.http.get<OrderDetails>(`${this.baseUrl}/${id}`); }
}
