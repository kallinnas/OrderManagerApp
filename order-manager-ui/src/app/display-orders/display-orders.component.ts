import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../modules/general.module';
import { OrderService } from '../services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-display-orders',
  standalone: true,
  imports: [GeneralModule],
  templateUrl: './display-orders.component.html',
  styleUrl: './display-orders.component.css'
})
export class DisplayOrdersComponent implements OnInit {

  dataSource: any;
  displayedColumns = ['id', 'employeeName', 'customerName', 'shipperName', 'orderDate', 'orderTotalPrice', 'remove',];

  service = inject(OrderService);
  datePipe = inject(DatePipe);

  ngOnInit(): void {
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

  private resetData() {
    this.service.$orders.subscribe(orders => {
      if (orders) {
        this.dataSource = new MatTableDataSource(orders);
      }
    });
  }
}
