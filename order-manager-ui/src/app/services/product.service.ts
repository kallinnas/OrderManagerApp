import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductDtoGetDdl } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private baseUrl: string = environment.baseURL + `/Products`;
  private productSubject = new BehaviorSubject<ProductDtoGetDdl[]>([]);

  productsDdl$ = this.productSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  getProductById(id: number): ProductDtoGetDdl | undefined {
    return this.productSubject.value.find(s => s.id === id);
  }

  private loadProducts() {
    this.http.get<ProductDtoGetDdl[]>(`${this.baseUrl}/Ddl`).subscribe({
      next: (products: any) => this.productSubject.next(products),
      error: (error) => console.error('Failed to load products ddl options:', error)
    });
  }
}
