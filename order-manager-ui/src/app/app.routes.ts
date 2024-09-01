import { Routes } from '@angular/router';
import { DisplayOrdersComponent } from './display-orders/display-orders.component';
import { AddOrderComponent } from './add-order/add-order.component';

export const routes: Routes = [
    { path: '', component: DisplayOrdersComponent },
    { path: 'display-orders', component: DisplayOrdersComponent },
    { path: 'add-order', component: AddOrderComponent },
];
