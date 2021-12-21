const calculateTotalPrice = (cart, currency, dp=3) => {
    if(cart.length>0&&typeof currency == "object"){
        let sum = cart
        .map(
          (product) =>
            product.item.prices.find((price) => price.currency === currency.name)
              .amount*product.quantity
        )
        .reduce((acc, curr) => acc + curr);
      return parseFloat(sum).toFixed(dp);
    }else{
        return
    }
  
};

export default calculateTotalPrice;
