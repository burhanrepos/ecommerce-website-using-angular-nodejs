import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartTOLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  public addToCart(food: Food): void {
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if(cartItem)
      return;
    this.cart.items.push(new CartItem(food));
    this.setCartTOLocalStorage();
  }

  public removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter(item => item.food.id != foodId)
    this.setCartTOLocalStorage();
  }

  public changeQuanitity(foodId: string, quantity: number){
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartTOLocalStorage();
  }

  public clearCart(){
    this.cart = new Cart();
    this.setCartTOLocalStorage();
  }

  public getCartObservable(): Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartTOLocalStorage():void{
    this.cart.totalPrice = this.cart.items.reduce((pre,cur) => pre+cur.price,0)
    this.cart.totalCount = this.cart.items.reduce((pre,cur) => pre+cur.quantity,0)
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart',cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartTOLocalStorage():Cart{
    const cartJson =  localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson) : new Cart()
  }
}
