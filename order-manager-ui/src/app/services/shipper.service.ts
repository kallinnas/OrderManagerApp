import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { ShipperDtoGetDdl } from '../models/shipper.model';

@Injectable({ providedIn: 'root' })
export class ShipperService {

  private baseUrl: string = environment.baseURL + `/Shippers`;
  private shipperSubject = new BehaviorSubject<ShipperDtoGetDdl[]>([]);

  shippersDdl$ = this.shipperSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadShipper();
  }

  getShipperById(id: number): ShipperDtoGetDdl | undefined {
    return this.shipperSubject.value.find(s => s.id === id);
  }

  private loadShipper() {
    this.http.get<ShipperDtoGetDdl[]>(`${this.baseUrl}/Ddl`).subscribe({
      next: (shippersDdl: any) => this.shipperSubject.next(shippersDdl),
      error: (error) => console.error('Failed to load shippers ddl options:', error)
    });
  }

}