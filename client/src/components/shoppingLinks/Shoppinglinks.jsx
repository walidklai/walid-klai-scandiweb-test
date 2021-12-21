import React, { Component } from "react";
import cartIcon from "../../assets/imagesAndIcons/cartIcon.svg";
import EcommerceContext from "../context/EcommerceContext";
import Minincart from "../minicart/Minincart";
import {
  shopping_links,
  currency_dropdown,
  cart_dropdown,
} from "./ShoppinglinksStyle.module.scss";

export default class Shoppinglinks extends Component {
  componentDidMount() {
    this.context.getCurrencies();
  }
  render() {
    return (
      <div className={shopping_links}>
        <select
          className={currency_dropdown}
          onChange={(e) => this.context.getCurrentCurrency(e.target.value)}
        >
          {this.context.currencies.map((currency) => (
            <option value={currency.name} key={currency.name}>
              {currency.symbol} {currency.name}
            </option>
          ))}
        </select>
        <div className={cart_dropdown} onClick={this.context.handleToggleModal}>
          <div>{this.context.cart.length}</div>
          <img src={cartIcon} alt="cart-icon" />
        </div>
        <Minincart />
      </div>
    );
  }
}

Shoppinglinks.contextType = EcommerceContext;
