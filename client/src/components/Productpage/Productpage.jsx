import React, { Component } from "react";
import {
  carousel_container,
  carousel_selected_img,
  carousel_images,
  product_page,
  focus_img,
  product_info,
  product_info_name,
  product_info_brand,
  product_info_price,
  btn_add_to_cart,
  html_from_be,
  btn_added_to_cart,
} from "./ProductpageStyle.module.scss";
import WithRouter from "../withRouterHOC/WithRouter";
import EcommerceContext from "../context/EcommerceContext";
import Button from "../button/Button";
import Attribute from "../attribute/Attribute";

class Productpage extends Component {
  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
  }
  state = {
    selectedImage: 0,
    failedToLoadIndex: null,
  };
  componentDidMount() {
    this.context.getSingleProduct(this.props.location.pathname.slice(1));
  }

  handleSelection(index) {
    this.setState(() => ({ selectedImage: index }));
  }
  render() {
    return (
      <div className={product_page}>
        {this.context.currentProduct && (
          <>
            <div className={carousel_container}>
              <div className={carousel_images}>
                {this.context.currentProduct.gallery.map((img, index) => (
                  <img
                    key={img}
                    onError={() =>
                      this.setState(() => ({ failedToLoadIndex: index }))
                    }
                    style={{
                      display: `${
                        index === this.state.failedToLoadIndex && "none"
                      }`,
                    }}
                    src={img}
                    alt={this.props.location.pathname.slice(1)}
                    onClick={() => this.handleSelection(index)}
                    className={`${
                      index === this.state.selectedImage ? focus_img : null
                    }`}
                  />
                ))}
              </div>
              <img
                alt={`${this.props.location.pathname.slice(1)}${
                  this.context.currentProduct.gallery[this.state.selectedImage]
                }`}
                src={
                  this.context.currentProduct.gallery[this.state.selectedImage]
                }
                className={carousel_selected_img}
              />
            </div>
            <div className={product_info}>
              <div>
                <h2 className={product_info_name}>
                  {this.context.currentProduct.brand}
                </h2>
                <h2 className={product_info_brand}>
                  {this.context.currentProduct.name}
                </h2>
              </div>
              <div>
                {this.context.currentProduct.attributes.map((attribute) => (
                  <Attribute
                    key={attribute.id}
                    from="product_page"
                    productId={null}
                    attribute={attribute}
                    selectedAttributes={
                      this.context.currentProductSelectedAttributes
                    }
                  />
                ))}
              </div>
              <div className={product_info_price}>
                <span>PRICE:</span>
                <div>
                  {this.context.currentCurrency &&
                    this.context.currentCurrency.symbol}
                  {this.context.currentCurrency &&
                    this.context.currentProduct.prices.find(
                      (price) =>
                        price.currency === this.context.currentCurrency.name
                    ).amount}
                </div>
              </div>
              <Button
                className={`${btn_add_to_cart} ${
                  (this.context.cart
                    .map((product) => product.item.id)
                    .includes(this.props.location.pathname.slice(1)) &&
                    btn_added_to_cart) ||
                  null
                }`}
                type="secondary"
                onClick={() =>
                  this.context.addToCart(
                    (this.state.failedToLoadIndex && {
                      ...this.context.currentProduct,
                      gallery: [
                        ...this.context.currentProduct.gallery.slice(
                          0,
                          this.state.failedToLoadIndex
                        ),
                        ...this.context.currentProduct.gallery.slice(
                          this.state.failedToLoadIndex + 1
                        ),
                      ],
                    }) ||
                      this.context.currentProduct
                  )
                }
                disabled={this.context.currentProduct.inStock}
              >
                {(this.context.cart
                  .map((product) => product.item.id)
                  .includes(this.props.location.pathname.slice(1)) &&
                  "ADDED") ||
                  "ADD TO CART"}
              </Button>
              <p
                className={html_from_be}
                dangerouslySetInnerHTML={{
                  __html: this.context.currentProduct.description,
                }}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default WithRouter(Productpage);

Productpage.contextType = EcommerceContext;
