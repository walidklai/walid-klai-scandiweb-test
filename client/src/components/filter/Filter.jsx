import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import EcommerceContext from "../context/EcommerceContext";
import {
  overlay,
  filter,
  filter_category,
  filter_title,
  filter_category_selected,
  filter_header_container,
  filter_not_open,
  overlay_not_open,
  filter_not_open_animated,
} from "./FilterStyle.module.scss";
import closeIcon from "../../assets/imagesAndIcons/close.svg";

export default class Filter extends Component {
  render() {
    return ReactDOM.createPortal(
      <>
        <div
          className={`${overlay} ${
            !this.context.filterIsOpen && overlay_not_open
          }`}
          onClick={this.context.handleToggleFilter}
        ></div>
        <div
          className={`${filter} ${
            this.context.filterIsOpen ||
            (!this.context.filterIsOpen &&
              this.context.initialFilterIsOpen &&
              filter_not_open_animated) ||
            filter_not_open
          }`}
        >
          <div className={filter_header_container}>
            <div className={filter_title}>categories</div>{" "}
            <img
              alt="close"
              src={closeIcon}
              onClick={this.context.handleToggleFilter}
            />
          </div>
          <hr />
          {this.context.categories.map((category) => (
            <Link to="/" key={category}>
              <div
                className={`${filter_category} ${
                  this.context.currentCategory === category &&
                  filter_category_selected
                }`}
                onClick={() => {
                  this.context.handleCurrentCategory(category);
                  this.context.getProductsPerCategory(category);
                }}
              >
                {category}
              </div>
            </Link>
          ))}
        </div>
      </>,

      document.getElementById("filter")
    );
  }
}

Filter.contextType = EcommerceContext;
