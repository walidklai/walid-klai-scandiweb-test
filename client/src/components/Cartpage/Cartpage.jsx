import React, { Component } from "react";
import { Navigate } from "react-router";
import CartItem from "../cartItem/CartItem";
import EcommerceContext from "../context/EcommerceContext";
import {
  cart_page_title,
  cart_items_container,
  cart_page,
} from "./CartpageStyle.module.scss";

export default class Cartpage extends Component {
  state={
    failedToLoadIndex:null
  }
  render() {
    return (
      <div className={cart_page}>
        {(this.context.cart.length > 0 && (
          <>
            <h2 className={cart_page_title}>Cart</h2>
            <div className={cart_items_container}>
              {this.context.cart.map((cartItem) => (
                <div key={cartItem.item.id}>
                  <hr />
                  <CartItem from="cart_page" item={cartItem} />
                </div>
              ))}
            </div>
          </>
        )) || <Navigate to="/" />}
      </div>
    );
  }
}

Cartpage.contextType = EcommerceContext;
