import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeneralModule } from './modules/general.module';
import { DisplayOrdersComponent } from './display-orders/display-orders.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GeneralModule, DisplayOrdersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'order-manager-ui';
}
