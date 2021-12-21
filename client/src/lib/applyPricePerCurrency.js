const applyPricePerCurrency = (prices, currentCurrency) => {
  return prices.find((price) => price.currency === currentCurrency.name).amount;
};

export default applyPricePerCurrency;
