import { Component, inject, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  basketService = inject(BasketService);
  constructor(private productService: ProductService,private toastController: ToastController, private loadingCtrl: LoadingController) {}
  isToastOpen: boolean = false;

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }


  async presentToast(position: 'top' | 'middle' | 'bottom', message:string = "An error occurred") {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      color: 'danger',
    });

    await toast.present();
  }
  ngOnInit() {
    this.productService.getList().subscribe(
      (res: any) => {
        console.log(res);
        this.products = res.data.map((product: Product) => {  
          return {
            ...product,
            quantity: product.quantity || 1,
          }
        })
      },
      (error) => {
        console.log(error, 'error');
        this.presentToast('top', error);
        console.log(error);
      }
    );
  }
  decreaseQuantity(product:Product) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }
  increaseQuantity(product:Product) {
    product.quantity++;
  }

  addToCart(product:Product) {
    this.showLoading()
    this.basketService.addToBasket(product).subscribe(res=>{
      console.log(res);
      this.dismissLoading()
      this.basketService.updateBasket();
      this.presentToast('top', 'Product added to cart');
    });
  }


  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',    });

    loading.present();
  }

  async dismissLoading() {
    this.loadingCtrl.dismiss();
  }
}
