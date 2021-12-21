import React, { Component } from "react";
import { nav, brand, nav_link } from "./NavbarStyle.module.scss";
import brandLogo from "../../assets/imagesAndIcons/brandIcon.svg";
import Navlinks from "../navLinks/Navlinks";
import Shoppinglinks from "../shoppingLinks/Shoppinglinks";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className={nav}>
        <Navlinks />
        <Link className={nav_link} to="/">
          {" "}
          <img className={brand} src={brandLogo} alt="brand logo" />
        </Link>
        <Shoppinglinks />
      </div>
    );
  }
}
