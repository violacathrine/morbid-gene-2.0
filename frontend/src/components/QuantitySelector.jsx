import React from "react";
import {
  QuantityContainer,
  QuantityLabel,
  QuantityInput,
} from "../pages/ProductPage.styles";

export const QuantitySelector = ({ quantity, onChange, min = 1, max = 10 }) => {
  const handleChange = (e) => {
    const value = parseInt(e.target.value) || min;
    // Säkerställ att värdet är inom giltiga gränser
    const clampedValue = Math.max(min, Math.min(max, value));
    onChange(clampedValue);
  };

  return (
    <QuantityContainer>
      <QuantityLabel htmlFor="quantity">Quantity:</QuantityLabel>
      <QuantityInput
        id="quantity"
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={handleChange}
      />
    </QuantityContainer>
  );
};