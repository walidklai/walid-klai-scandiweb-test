import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import {
  error_boundary,
  btn_error_boundary,
} from "./GlobalErrorBoundaryStyle.module.scss";

export default class GlobalErrorBoudaries extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  /*  componentDidCatch(error,errorInfo){

  } */
  render() {
    return (
      <div>
        {(this.state.hasError && (
          <div className={error_boundary}>
            <div>
              <h1>Oops, Something went wrong ...</h1>
              <a href="http://localhost:3000">
                <Button type="primary" className={btn_error_boundary}>
                  HOME
                </Button>
              </a>
            </div>
          </div>
        )) ||
          this.props.children}
      </div>
    );
  }
}
