import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  public cart!:Cart;
  constructor(private cartService: CartService){}
  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((cart) =>{
      this.cart = cart;
    })
  }

  public removeFromCart(cartItem: CartItem){
    this.cartService.removeFromCart(cartItem.food.id);
  }

  public changeQuantity(cartItem: CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString)
    this.cartService.changeQuanitity(cartItem.food.id,quantity);
  }

}
