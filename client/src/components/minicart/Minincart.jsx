import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import calculateTotalPrice from "../../lib/calculateTotalPrice";
import Button from "../button/Button";
import CartItem from "../cartItem/CartItem";
import EcommerceContext from "../context/EcommerceContext";
import {
  mini_cart,
  open,
  not_open,
  overlay,
  btn_group,
  btn_minicart,
  minicart_price,
  my_bag_item,
  overlay_not_open,
  not_open_animated,
} from "./MinicartStyle.module.scss";

export default class Minincart extends Component {
  render() {
    return ReactDOM.createPortal(
      <>
        <div
          className={`${overlay} ${
            this.context.isOpen ? open : overlay_not_open
          }`}
          onClick={this.context.handleToggleModal}
        ></div>
        <div
          className={`${mini_cart}  ${
            (this.context.isOpen && open) ||
            (this.context.initialIsOpen && not_open_animated) ||
            not_open
          }`}
        >
          <span className={my_bag_item}>
            <strong>My Bag {this.context.cart.length}</strong> item
            {this.context.cart.length !== 1 && "s"}
          </span>
          <div>
            {this.context.cart.map((el, i) => (
              <div key={Math.random() * 1000}>
                <CartItem from="mini_cart" item={el} />
              </div>
            ))}
          </div>
          <div className={minicart_price}>
            <span>Total</span>
            <span>
              {calculateTotalPrice(
                this.context.cart,
                this.context.currentCurrency
              )}
              {this.context.currentCurrency &&
                this.context.currentCurrency.symbol}
            </span>
          </div>
          <div className={btn_group}>
            <Link to="/cart" onClick={this.context.handleToggleModal}>
              {" "}
              <Button type="primary" className={btn_minicart}>
                VIEW BAG
              </Button>
            </Link>

            <Button type="secondary" className={btn_minicart}>
              CHECKOUT{" "}
            </Button>
          </div>
        </div>
      </>,

      document.getElementById("portal")
    );
  }
}

Minincart.contextType = EcommerceContext;
