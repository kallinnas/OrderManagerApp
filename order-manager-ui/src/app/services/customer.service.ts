import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { CustomerDtoGetDdl } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {

  private baseUrl: string = environment.baseURL + `/Customers`;
  private customerSubject = new BehaviorSubject<CustomerDtoGetDdl[]>([]);

  customersDdl$ = this.customerSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCustomers();
  }

  getCustomerById(id: number): CustomerDtoGetDdl | undefined {
    return this.customerSubject.value.find(c => c.id === id);
  }

  private loadCustomers(): void {
    this.http.get<CustomerDtoGetDdl[]>(`${this.baseUrl}/Ddl`).subscribe({
      next: (customersDdl) => this.customerSubject.next(customersDdl),
      error: (error) => console.error('Failed to load customers ddl options:', error)
    });
  }
}
