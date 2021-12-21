import React, { Component } from "react";
import {
  card,
  card_name,
  card_price,
  img_container,
  not_in_stock,
} from "./CardStyle.module.scss";
import { Link } from "react-router-dom";
import EcommerceContext from "../context/EcommerceContext";

export default class Card extends Component {
  render() {
    const { id, name, prices, gallery, inStock } = this.props.productInfo;
    return (
      <Link to={`/${id}`}>
        <div
          className={`${card} ${inStock ? null : not_in_stock}`}
          onClick={this.handleClick}
        >
          <div className={img_container}>
            <img src={gallery[0]} alt={`${name}`}/>
          </div>
          <div className={card_name}>{name}</div>
          <div className={card_price}>
            {this.context.currentCurrency &&
              this.context.currentCurrency.symbol}
            {this.context.currentCurrency &&
              prices.find(
                (price) => price.currency === this.context.currentCurrency.name
              ).amount}
          </div>
        </div>
      </Link>
    );
  }
}

Card.contextType = EcommerceContext;
