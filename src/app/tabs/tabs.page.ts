import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  basketTotal: number = 0;

  constructor(private basketService: BasketService) {
    this.basketService.basketUpdated$.subscribe(() => this.getBasketTotal());
  }

  ngOnInit() {
    this.getBasketTotal();
  }

  getBasketTotal() {
    this.basketService.getList().subscribe((res: any) => {
      console.log(res, 'kerim');
      this.basketTotal = res.data.reduce((acc: any, item: any) => {
        return acc + item.quantity * item.product.price;
      }, 0);
    });
  }
}
