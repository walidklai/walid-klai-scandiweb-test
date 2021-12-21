import React, { PureComponent } from "react";
import attributeMatchesSelection from "../../lib/attributeMatchesSelection";
import EcommerceContext from "../context/EcommerceContext";
import {
  attribute_container,
  attribute,
  attribute_name,
  attribute_text,
  attribute_text_selected,
  attribute_swatch,
  attribute_swatch_selected,
  attribute_name_product_page,
  attribute_text_mini_cart,
  attribute_container_product_page,
  attribute_name_mini_cart
} from "./AttributeStyle.module.scss";

export default class Attribute extends PureComponent {
  componentDidMount() {
    window.addEventListener("resize", this.saveScreenSize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.saveScreenSize.bind(this));
  }

  state = {
    screenWidth: window.innerWidth <= 320,
  };

  saveScreenSize() {
    window.innerWidth !== this.state.screenWidth &&
      this.setState((prev) => ({ screenWidth: window.innerWidth <= 320 }));
  }

  render() {
    return (
      <>
        <div
          className={`${attribute_name} ${
           ( this.props.from === "product_page" && attribute_name_product_page) ||( this.props.from === "mini_cart" && attribute_name_mini_cart)
          }`}
        >
          {(this.props.from === "product_page" ||
            this.context.cart.find(
              (product) => product.item.id === this.props.productId
            ).selectedAttributes.length > 1) &&
            this.props.attribute &&
            this.props.attribute.name + ":"}
        </div>
        <div
          className={`${attribute_container} ${
            this.props.from === "product_page" &&
            attribute_container_product_page
          }`}
        >
          {this.props &&
            this.props.attribute &&
            this.props.attribute.items.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  this.context.handleChangeAttribute(this.props.productId, {
                    name: this.props.attribute.name,
                    value: item.value,
                  })
                }
                className={`${attribute} ${
                  (this.props.attribute.type === "text" &&
                    this.props.from === "mini_cart" &&
                    attribute_text_mini_cart) ||
                  (this.props.attribute.type === "text" &&
                    this.state.screenWidth &&
                    attribute_text_mini_cart) ||
                  (this.props.attribute.type === "text" && attribute_text)
                } ${
                  this.props.attribute.type === "text" &&
                  this.props.selectedAttributes &&
                  attributeMatchesSelection(
                    { name: this.props.attribute.name, value: item.value },
                    this.props.selectedAttributes
                  )
                    ? attribute_text_selected
                    : null
                } ${
                  this.props.attribute.type === "swatch"
                    ? attribute_swatch
                    : null
                } ${
                  this.props.attribute.type === "swatch" &&
                  this.props.selectedAttributes &&
                  attributeMatchesSelection(
                    { name: this.props.attribute.name, value: item.value },
                    this.props.selectedAttributes
                  )
                    ? attribute_swatch_selected
                    : null
                }`}
                style={{
                  backgroundColor: `${
                    this.props.attribute.type === "swatch" ? item.value : ""
                  }`,
                }}
              >
                {this.props.attribute.type === "text" ? item.value : null}
              </div>
            ))}
        </div>
      </>
    );
  }
}

Attribute.contextType = EcommerceContext;
