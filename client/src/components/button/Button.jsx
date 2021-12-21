import React, { PureComponent } from "react";
import {
  btn,
  btn_primary,
  btn_secondary,
  disabled,
} from "./ButtonStyle.module.scss";

export default class Button extends PureComponent {
  render() {
    return (
      <div
        className={`${btn} ${
          this.props.type === "primary"
            ? btn_primary
            : this.props.type === "secondary"
            ? btn_secondary
            : null
        } ${
          this.props.disabled || typeof this.props.disabled == "undefined"
            ? null
            : disabled
        } ${this.props.className}`}
        onClick={this.props.onClick}
      >
        {this.props.disabled || typeof this.props.disabled == "undefined"
          ? this.props.children
          : "OUT OF STOCK"}
      </div>
    );
  }
}
