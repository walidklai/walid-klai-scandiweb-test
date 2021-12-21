const attributeMatchesSelection = (currentAttribute, selectedAttributes) => {
  return selectedAttributes
    .map((attribute) => JSON.stringify(attribute))
    .includes(JSON.stringify(currentAttribute));
};

export default attributeMatchesSelection;
