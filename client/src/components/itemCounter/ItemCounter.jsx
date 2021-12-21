import React, { Component } from "react";
import Button from "../button/Button";
import { counter, btn_counter } from "./ItemCounterStyle.module.scss";
import plusIcon from "../../assets/imagesAndIcons/plus.svg";
import minusIcon from "../../assets/imagesAndIcons/minus.svg";
import EcommerceContext from "../context/EcommerceContext";

export default class ItemCounter extends Component {
  render() {
    return (
      <div className={`${counter} ${this.props.from==="cart_page"&&this.props.btnStyle}`}>
        <Button
          className={`${this.props.btnStyle} ${btn_counter}`}
          onClick={() => this.context.incrementCounter(this.props.productId)}
        >
          <img src={plusIcon} alt="increment"/>
        </Button>
        {this.props.count}
        <Button
          className={`${this.props.btnStyle} ${btn_counter}`}
          onClick={() => this.context.decrementCounter(this.props.productId)}
        >
          <img src={minusIcon} alt="decrement"/>
        </Button>
      </div>
    );
  }
}

ItemCounter.contextType = EcommerceContext;
