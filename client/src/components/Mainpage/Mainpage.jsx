import React, { Component } from "react";
import Card from "../card/Card";
import EcommerceContext from "../context/EcommerceContext";
import {main_page, main_page_title, cards_container } from "./MainpageStyle.module.scss";
import capitalizeFirstLetter from "../../lib/capitalizeFirstLetter";

export default class Mainpage extends Component {
  componentDidMount() {
    this.context.getProductsPerCategory(this.context.currentCategory);
  }
 


  render() {
    return (
      <div className={main_page}>
        <h1 className={main_page_title}>
          {capitalizeFirstLetter(this.context.currentCategory)}
        </h1>
        <div className={cards_container}>
          {this.context.productsPerCategory.length > 0 &&
            this.context.productsPerCategory.map((product) => (
              <Card productInfo={product} key={product.id}/>
            ))}
        </div>
      </div>
    );
  }
}

Mainpage.contextType = EcommerceContext;
