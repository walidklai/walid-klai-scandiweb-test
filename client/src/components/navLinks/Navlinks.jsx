import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import EcommerceContext from "../context/EcommerceContext";
import Filter from "../filter/Filter";
import {
  nav_links,
  nav_item,
  selected_nav_link,
  btn_filter,
} from "./NavlinksStyle.module.scss";

export default class Navlinks extends Component {
  componentDidMount() {
    this.context.getCategories();
    window.addEventListener("resize", this.saveScreenSize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.saveScreenSize.bind(this));
  }

  state = {
    screenWidth: window.innerWidth <= 860,
  };

  saveScreenSize() {
    window.innerWidth !== this.state.screenWidth &&
      this.setState((prev) => ({ screenWidth: window.innerWidth <= 860 }));
  }

  render() {
    return (
      <>
        {((this.context.categories.length > 3 || this.state.screenWidth) && (
          <>
            <Button
              className={btn_filter}
              type="primary"
              onClick={this.context.handleToggleFilter}
            >
              FILTER
            </Button>
            <Filter />
          </>
        )) || (
          <ul className={nav_links}>
            {this.context.categories.map((cat) => (
              <li key={cat}
                className={`${nav_item} ${
                  this.context.currentCategory === cat ? selected_nav_link : null
                }`}
              >
                <Link
                  to="/"
                  onClick={() => {
                    this.context.isOpen && this.context.handleToggleModal();
                    this.context.handleCurrentCategory(cat);
                    this.context.getProductsPerCategory(cat);
                  }}
                >
                  {cat.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

Navlinks.contextType = EcommerceContext;
