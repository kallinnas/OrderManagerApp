import { Routes } from '@angular/router';
import { DisplayOrdersComponent } from './display-orders/display-orders.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';

export const routes: Routes = [
    { path: '', component: DisplayOrdersComponent },
    { path: 'display-orders', component: DisplayOrdersComponent },
    { path: 'add-order', component: AddOrderComponent },
    { path: 'edit-order', component: EditOrderComponent },
];
