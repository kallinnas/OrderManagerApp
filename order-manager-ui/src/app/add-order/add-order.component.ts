import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../services/customer.service';
import { EmployeeService } from '../services/employee.service';
import { ShipperService } from '../services/shipper.service';
import { ProductService } from '../services/product.service';
import { GeneralModule } from '../modules/general.module';
import { OrderService } from '../services/order.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [GeneralModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss'
})
export class AddOrderComponent implements OnInit {

  form!: any;
  defaultDate = new Date();
  selectedFile: File | null = null;
  isOrderFilled: boolean = false;

  get orderDetails(): FormArray { return this.form.get('orderDetails') as FormArray; }

  constructor(
    private formBuilder: FormBuilder,
    public customerService: CustomerService,
    public employeeService: EmployeeService,
    public shipperService: ShipperService,
    public productService: ProductService,
    private orderService: OrderService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  updateUnitPrice(index: number): void {
    const detail = this.orderDetails.at(index);
    const productFromForm = detail.get('productId');
    const quantity = detail.get('quantity');

    if (productFromForm) {
      this.productService.productsDdl$.subscribe(products => {
        const product = products.find(p => p.id === productFromForm.value);

        if (product?.price != undefined) {
          quantity?.setValue(quantity.value <= 0 ? 1 : quantity.value);
          detail.get('unitPrice')?.setValue(product.price * quantity?.value);
        }
      });
    }
  }

  createOrder(): void {
    if (this.form.valid && !this.selectedFile) {

      this.prepareOrder()

      this.orderService.addOrderAsync(this.form.value).subscribe({
        next: (result: any) => {
          if (result) {
            alert('Order created successfully!');
            this.resetForm();
          }
        },

        error: (error: HttpErrorResponse) => { console.error('Error creating order:', error.message); }
      });
    }
  }

  private prepareOrder() {
    // fixes issue with one_day_before date on server
    this.form.value.orderDate = this.utilsService.convertDate(new Date(this.form.value.orderDate));

    const formValue = { ...this.form.value };
    // exclude 'unitPrice' to imitate OrderDtoAdd object that controller expects
    formValue.orderDetails = formValue.orderDetails = formValue.orderDetails.map((detail: any) => {
      const { unitPrice, ...cleanDetail } = detail;
      return cleanDetail; // array with excluded controls
    });
  }

  private resetForm() {
    // neccessary properties have `Id` in their names to be able 
    // to pass data from addOrderAsync() to controller
    this.form = this.formBuilder.group({
      id: [0],
      customerId: ['', Validators.required],
      employeeId: ['', Validators.required],
      orderDate: [this.defaultDate, Validators.required],
      shipperId: ['', Validators.required],
      orderDetails: this.formBuilder.array([this.resetOrderDetails()])
    });
  }

  private resetOrderDetails() {
    return this.formBuilder.group({
      productId: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      unitPrice: [{ value: '0', disabled: true }]
    })
  }

  addOrderDetails() { this.orderDetails.push(this.resetOrderDetails()); }

  removeOrderDetails(index: number) {
    if (this.orderDetails.length > 1) {
      this.orderDetails.removeAt(index);
    } else this.orderDetails.setControl(index, this.resetOrderDetails());
  }

  isCreateOrderButtonVisible(): boolean {
    return this.orderDetails.length > 0 &&
      this.orderDetails.controls.every(control => control.valid && control.value.quantity > 0);
  }

  isOrderDetailsSectionVisible(): boolean {
    const allControlsExceptOrderDetails = Object.values(this.form.controls).filter((control: any) => control instanceof FormControl);
    // returns true if all controls (except orderDetails) are valid
    return allControlsExceptOrderDetails.every((control: any) => control.valid);
  }
}
