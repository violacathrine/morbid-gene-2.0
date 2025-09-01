import {
  QuantityContainer,
  QuantityLabel,
  QuantityInput,
} from "./shared/FormComponents";

export const QuantitySelector = ({ quantity, onChange, min = 1, max = 10 }) => {
  const handleChange = (e) => {
    const value = parseInt(e.target.value) || min;
    // Ensure the value is within valid limits
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