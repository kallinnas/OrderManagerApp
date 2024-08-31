import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

import { GeneralModule } from '../modules/general.module';
import { OrderService } from '../services/order.service';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-display-orders',
  standalone: true,
  imports: [GeneralModule],
  templateUrl: './display-orders.component.html',
  styleUrl: './display-orders.component.css'
})
export class DisplayOrdersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // AUTOCOMPLETE
  filterControl = new FormControl('', [Validators.pattern(/^[a-zA-Z0-9 ]*$/)]);
  filteredOrders$!: Observable<any[]>;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['id', 'employeeName', 'customerName', 'shipperName', 'orderDate', 'orderTotalPrice', 'remove',];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public filterService: FilterService,
    private orderService: OrderService,
    public datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.setAutocomplete();
  }

  ngAfterViewInit() {
    this.resetData();
  }

  private setAutocomplete() {
    this.filteredOrders$ = this.filterService.onFilterChanges(this.filterControl, this.dataSource);
  }

  deleteOrder(id: any) {
    this.orderService.deleteOrder(id).subscribe(result => {
      if (result) {
        alert('Order id' + id + ' was deleted successfully.');
        this.resetData();
      }
    });
  }

  sortData(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else this._liveAnnouncer.announce('Sorting cleared');
  }

  private resetData() {
    this.orderService.$orders.subscribe(orders => {
      if (orders) {
        this.dataSource.data = orders.map(order => ({ // TODO: remapping orderDate must be passed asorderDateConv from server
          ...order, orderDate: this.datePipe.transform(order.orderDate, 'dd-MM-yyyy' || '')
        }));
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

}
