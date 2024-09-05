import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductDtoGetDdl } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = environment.baseURL + `/Products`;

  http = inject(HttpClient);

  productsDdl$ = this.http.get<ProductDtoGetDdl[]>(`${this.baseUrl}/Ddl`);


}
