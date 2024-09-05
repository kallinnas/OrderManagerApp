import { OrderDetails } from "./order-details.model";

export interface Order {
    id: number;
    customerId: number;
    employeeId: number;
    shipperId: number;
    orderDate: Date;
    orderDetails: OrderDetails[];
}

export interface OrderDtoGetAll {
    id: number;
    employeeName: string;
    employeeId: string;
    shipperId: string;
    orderDate: Date;
    orderTotalPrice: number
}