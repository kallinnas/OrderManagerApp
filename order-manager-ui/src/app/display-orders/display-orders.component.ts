import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { GeneralModule } from '../modules/general.module';
import { OrderService } from '../services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';

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

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['id', 'employeeName', 'customerName', 'shipperName', 'orderDate', 'orderTotalPrice', 'remove',];

  private _liveAnnouncer = inject(LiveAnnouncer);
  service = inject(OrderService);
  datePipe = inject(DatePipe);

  ngOnInit(): void {
    // this.resetData();
  }

  ngAfterViewInit() {
    this.resetData();
  }

  deleteOrder(id: any) {
    this.service.deleteOrder(id).subscribe(result => {
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
    this.service.$orders.subscribe(orders => {
      if (orders) {
        this.dataSource.data = orders;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}
