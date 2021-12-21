import React, { Component } from "react";
import ItemCounter from "../itemCounter/ItemCounter";
import {
  cart_item,
  cart_item_info,
  cart_item_utils,
  trash_icon,
  cart_item_info_name_cart_page,
  cart_item_info_brand_cart_page,
  cart_item_cart_page,
  btn_cart_item_mini_cart,
  cart_item_img_mini_cart,
  cart_item_img_cart_page,
  cart_item_mini_cart,
  cart_item_price,
  cart_item_price_cart_page,
  cart_item_info_brand_mini_cart,
  cart_item_info_name_mini_cart,
  cart_item_img_container,
  cart_item_img_left_arrow,
  cart_item_img_right_arrow,
  cart_item_utils_cart_page_mobile,
  counter_cart_page,
} from "./CartItemStyle.module.scss";
import applyPricePerCurrency from "../../lib/applyPricePerCurrency";
import EcommerceContext from "../context/EcommerceContext";
import Attribute from "../attribute/Attribute";
import trashIcon from "../../assets/imagesAndIcons/trash_icon.svg";
import leftArrow from "../../assets/imagesAndIcons/left_arrow.svg";
import rightArrow from "../../assets/imagesAndIcons/right_arrow.svg";

export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.incrementImage = this.incrementImage.bind(this);
    this.decrementImage = this.decrementImage.bind(this);
  }
  state = {
    currentIndex: 0,
  };
  incrementImage() {
    this.setState((prev) => ({
      currentIndex:
        prev.currentIndex === this.props.item.item.gallery.length - 1
          ? 0
          : prev.currentIndex + 1,
    }));
  }
  decrementImage() {
    this.setState((prev) => ({
      currentIndex:
        prev.currentIndex === 0
          ? this.props.item.item.gallery.length - 1
          : prev.currentIndex - 1,
    }));
  }
  render() {
    const { id, name, brand, prices, gallery, attributes } =
      this.props.item.item;
    return (
      <div
        className={`${cart_item} ${
          this.props.from &&
          this.props.from === "cart_page" &&
          cart_item_cart_page
        } ${
          this.props.from &&
          this.props.from === "mini_cart" &&
          cart_item_mini_cart
        }`}
      >
        <img
          src={trashIcon}
          className={trash_icon}
          onClick={() => this.context.removeFromCart(id)}
          alt={name}
        />
        <div className={cart_item_info}>
          <div>
            <p
              className={`${
                (this.props.from === "cart_page" &&
                  cart_item_info_brand_cart_page) ||
                (this.props.from === "mini_cart" &&
                  cart_item_info_brand_mini_cart)
              }`}
            >
              {brand}
            </p>
            <p
              className={`${
                (this.props.from === "cart_page" &&
                  cart_item_info_name_cart_page) ||
                (this.props.from === "mini_cart" &&
                  cart_item_info_name_mini_cart)
              }`}
            >
              {name}
            </p>
          </div>

          <div
            className={`${cart_item_price} ${
              this.props.from === "cart_page" && cart_item_price_cart_page
            }`}
          >
            {this.context.currentCurrency.symbol}
            {applyPricePerCurrency(prices, this.context.currentCurrency)}
          </div>
          <div>
            {attributes.map((attribute) => (
              <Attribute
                key={attribute.id}
                from={this.props.from}
                productId={id}
                attribute={attribute}
                selectedAttributes={this.props.item.selectedAttributes}
              />
            ))}
          </div>
        </div>
        <div
          className={`${cart_item_utils} ${
            this.props.from === "cart_page" && cart_item_utils_cart_page_mobile
          }`}
        >
          <ItemCounter
            from={this.props.from}
            count={this.props.item.quantity}
            productId={id}
            btnStyle={
              (this.props.from === "mini_cart" && btn_cart_item_mini_cart) ||
              (this.props.from === "cart_page" && counter_cart_page)
            }
          />
          <div className={cart_item_img_container}>
            {this.props.from === "cart_page" && gallery.length > 1 && (
              <>
                <img
                  alt="left-arrow"
                  src={leftArrow}
                  className={cart_item_img_left_arrow}
                  onClick={this.decrementImage}
                />
                <img
                  alt="right-arrow"
                  src={rightArrow}
                  className={cart_item_img_right_arrow}
                  onClick={this.incrementImage}
                />
              </>
            )}

            <img
              alt={`${id}${gallery[this.state.currentIndex]}`}
              src={gallery[this.state.currentIndex]}
              className={`${
                (this.props.from === "mini_cart" && cart_item_img_mini_cart) ||
                (this.props.from === "cart_page" && cart_item_img_cart_page)
              }`}
            />
          </div>
        </div>
      </div>
    );
  }
}

CartItem.contextType = EcommerceContext;
