import axios from "axios";
import React, { Component, createContext } from "react";
import getSymbolFromCurrency from "currency-symbol-map";

const EcommerceContext = createContext();

class EcommerceContextProvider extends Component {
  constructor(props) {
    super(props);
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handleToggleFilter = this.handleToggleFilter.bind(this);
    this.handleCurrentCategory = this.handleCurrentCategory.bind(this);
    this.getProductsPerCategory = this.getProductsPerCategory.bind(this);
    this.getCurrentProduct = this.getCurrentProduct.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getCurrentCurrency = this.getCurrentCurrency.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getSingleProduct = this.getSingleProduct.bind(this);
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.handleChangeAttribute = this.handleChangeAttribute.bind(this);
  }
  state = {
    isOpen: false,
    initialIsOpen: false,
    initialFilterIsOpen: false,
    filterIsOpen: false,
    currentCategory: "",
    productsPerCategory: [],
    currentProduct: null,
    cart: [],
    currencies: [],
    categories: [],
    currentCurrency: null,
    currentProductSelectedAttributes: {},
  };

  handleToggleModal() {
    if (this.state.cart.length > 0)
      this.setState((prev) => ({ isOpen: !prev.isOpen }));
    if (!this.state.initialIsOpen) {
      this.setState((prev) => ({ initialIsOpen: !prev.initialIsOpen }));
    }
  }

  handleToggleFilter() {
    this.state.isOpen && this.handleToggleModal();
    this.setState((prev) => ({ filterIsOpen: !prev.filterIsOpen }));
    if (!this.state.initialFilterIsOpen) {
      this.setState((prev) => ({
        initialFilterIsOpen: !prev.initialFilterIsOpen,
      }));
    }
  }

  handleCurrentCategory(value) {
    this.setState({ currentCategory: value });
  }

  async getSingleProduct(id) {
    //If i find the product in the cart i just display it from there without calling the graph api
    let productExists = this.state.cart.find(
      (product) => product.item.id === id
    );
    if (productExists) {
      this.setState((prev) => ({
        currentProduct: productExists.item,
        currentProductSelectedAttributes: productExists.selectedAttributes,
      }));
    } else {
      const query = `
        query{product(id:"${id}"){
          id
          name
          inStock
          gallery
          description
          category
          attributes{
            id
            name
            type
            items{
              displayValue
              value
              id
            }
          }
          brand
          prices{
            currency
            amount
          }
        }}
        `;
      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:4000/",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          data: JSON.stringify({ query }),
        });
        this.setState((prev) => ({
          currentProduct: response.data.data.product,
          currentProductSelectedAttributes:
            response.data.data.product.attributes.map((attribute) => {
              return {
                name: attribute.name,
                value:
                  attribute.items[0].type === "swatch"
                    ? attribute.items[0].displayValue
                    : attribute.items[0].value,
              };
            }),
        }));
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getCurrencies() {
    const query = `
    query{currencies}
      `;
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        data: JSON.stringify({ query }),
      });
      this.setState((prev) => ({
        currencies: response.data.data.currencies.map(
          (el) =>
            (el = {
              name: el,
              symbol: getSymbolFromCurrency(el),
            })
        ),
        currentCurrency: {
          name: response.data.data.currencies[0],
          symbol: getSymbolFromCurrency(response.data.data.currencies[0]),
        },
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async getCategories() {
    const query = `
    query{categories{
        name
      }}
      `;
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        data: JSON.stringify({ query }),
      });
      this.setState((prev) => ({
        categories: response.data.data.categories.map(
          (cat) => (cat = cat.name)
        ),
        currentCategory: response.data.data.categories[0].name,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsPerCategory(category) {
    if (!category) {
      const query = `
        query{categories{
            name
          }}
          `;
      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:4000/",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          data: JSON.stringify({ query }),
        });
        category = response.data.data.categories[0].name;
      } catch (error) {
        console.log(error);
      }
    }
    const query = `
    query{category(input:{title:"${category}"}){
        products{
          id
          name
          inStock
          gallery
          prices{
            currency
            amount
          }
        }
      }}
      `;
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        data: JSON.stringify({ query }),
      });
      this.setState((prev) => ({
        productsPerCategory: response.data.data.category.products,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentProduct(product_id) {
    this.setState((prev) => ({
      currentProduct: prev.productsPerCategory.find(
        (product) => product.id === product_id
      ),
    }));
  }

  addToCart(item) {
    const itemExists = this.state.cart.find(
      (cartItem) => cartItem.item.id === item.id
    );
    if (itemExists) {
      return;
    } else {
      this.setState((prev) => ({
        cart: [
          ...prev.cart,
          {
            item,
            quantity: 1,
            selectedAttributes: this.state.currentProductSelectedAttributes,
          },
        ],
      }));
    }
  }

  removeFromCart(productId) {
    let tmpCart = this.state.cart.filter(
      (product) => product.item.id !== productId
    );
    this.setState((prev) => ({ cart: tmpCart }));
    if (this.state.cart.length === 1 && this.state.isOpen === true)
      this.handleToggleModal();
  }

  getCurrentCurrency(currency) {
    this.setState((prev) => ({
      currentCurrency: {
        name: currency,
        symbol: getSymbolFromCurrency(currency),
      },
    }));
  }

  incrementCounter(productId) {
    let tmpCart = [...this.state.cart];
    let tmpProductIndex = tmpCart
      .map((p) => {
        return p.item.id;
      })
      .indexOf(productId);
    let tmpCurrentProduct = tmpCart[tmpProductIndex];
    tmpCart[tmpProductIndex] = {
      ...tmpCurrentProduct,
      quantity: tmpCurrentProduct.quantity + 1,
    };
    this.setState((prev) => ({ cart: tmpCart }));
  }

  decrementCounter(productId) {
    let tmpCart = [...this.state.cart];
    let tmpProductIndex = tmpCart
      .map((p) => {
        return p.item.id;
      })
      .indexOf(productId);
    let tmpCurrentProduct = tmpCart[tmpProductIndex];
    tmpCart[tmpProductIndex] = {
      ...tmpCurrentProduct,
      quantity:
        tmpCurrentProduct.quantity > 1
          ? tmpCurrentProduct.quantity - 1
          : tmpCurrentProduct.quantity,
    };
    this.setState((prev) => ({ cart: tmpCart }));
  }

  handleChangeAttribute(productId, updatedAttribute) {
    if (productId) {
      let tmpCart = [...this.state.cart];
      let tmpProductIndex = tmpCart
        .map((p) => {
          return p.item.id;
        })
        .indexOf(productId);
      let tmpCurrentProduct = tmpCart[tmpProductIndex];
      let tmpChosenSelectedAttributeIndex = tmpCurrentProduct.selectedAttributes
        .map((attribute) => attribute.name)
        .indexOf(updatedAttribute.name);
      tmpCurrentProduct.selectedAttributes[tmpChosenSelectedAttributeIndex] =
        updatedAttribute;
      tmpCart[tmpProductIndex] = tmpCurrentProduct;
      this.setState((prev) => ({ cart: tmpCart }));
      if (this.state.currentProduct.id === productId) {
        this.setState((prev) => ({
          currentProductSelectedAttributes:
            tmpCurrentProduct.selectedAttributes,
        }));
      }
    } else {
      let tmpCurrentProductSelectedAttributes = [
        ...this.state.currentProductSelectedAttributes,
      ];
      let tmpChosenSelectedAttributeIndex = tmpCurrentProductSelectedAttributes
        .map((attribute) => attribute.name)
        .indexOf(updatedAttribute.name);
      tmpCurrentProductSelectedAttributes[tmpChosenSelectedAttributeIndex] =
        updatedAttribute;
      this.setState((prev) => ({
        currentProductSelectedAttributes: tmpCurrentProductSelectedAttributes,
      }));
      if (
        this.state.cart.find(
          (product) => product.item.id === this.state.currentProduct.id
        )
      ) {
        let tmpCart = [...this.state.cart];
        let tmpProductIndex = tmpCart
          .map((p) => {
            return p.item.id;
          })
          .indexOf(this.state.currentProduct.id);
        let tmpCurrentProduct = tmpCart[tmpProductIndex];
        let tmpChosenSelectedAttributeIndex =
          tmpCurrentProduct.selectedAttributes
            .map((attribute) => attribute.name)
            .indexOf(updatedAttribute.name);
        tmpCurrentProduct.selectedAttributes[tmpChosenSelectedAttributeIndex] =
          updatedAttribute;
        tmpCart[tmpProductIndex] = tmpCurrentProduct;
        this.setState((prev) => ({ cart: tmpCart }));
      }
    }
  }

  render() {
    const {
      isOpen,
      initialIsOpen,
      filterIsOpen,
      initialFilterIsOpen,
      currentCategory,
      productsPerCategory,
      currentProduct,
      cart,
      currencies,
      currentCurrency,
      categories,
      currentProductSelectedAttributes,
    } = this.state;
    const {
      handleToggleModal,
      handleToggleFilter,
      handleCurrentCategory,
      getProductsPerCategory,
      getCurrentProduct,
      addToCart,
      getCurrentCurrency,
      getCurrencies,
      getCategories,
      getSingleProduct,
      incrementCounter,
      decrementCounter,
      removeFromCart,
      handleChangeAttribute,
    } = this;
    return (
      <EcommerceContext.Provider
        value={{
          isOpen,
          initialIsOpen,
          filterIsOpen,
          initialFilterIsOpen,
          currentCategory,
          productsPerCategory,
          currentProduct,
          cart,
          currencies,
          currentCurrency,
          categories,
          currentProductSelectedAttributes,
          handleToggleModal,
          handleToggleFilter,
          handleCurrentCategory,
          getProductsPerCategory,
          getCurrentProduct,
          addToCart,
          getCurrentCurrency,
          getCurrencies,
          getCategories,
          getSingleProduct,
          incrementCounter,
          decrementCounter,
          removeFromCart,
          handleChangeAttribute,
        }}
      >
        {this.props.children}
      </EcommerceContext.Provider>
    );
  }
}

export { EcommerceContextProvider };

export default EcommerceContext;
