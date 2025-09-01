import { SelectionContainer, Select } from "./shared/FormComponents";

export const ProductSelectors = ({
  productType,
  product,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}) => {
  // Function to check availability
  const isAvailable = (sizeId, appearanceId) => {
    return productType?.stockStates?.some(
      (stock) =>
        stock.size.id === sizeId &&
        stock.appearance.id === appearanceId &&
        stock.available === true
    );
  };

  // Filter sizes based on selected color
  const getAvailableSizes = () => {
    if (!selectedColor || !productType) return productType?.sizes || [];

    return productType.sizes.map((size) => ({
      ...size,
      available: isAvailable(size.id, selectedColor),
    }));
  };

  // Format color name (first letter uppercase)
  const formatColorName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  if (!productType) return null;

  return (
    <SelectionContainer>
      <Select value={selectedColor || ""} onChange={onColorChange}>
        <option value="">Select Color</option>
        {productType.appearances
          ?.filter((color) => product.appearanceIds?.includes(color.id))
          ?.map((color) => (
            <option key={color.id} value={color.id}>
              {formatColorName(color.name)}
            </option>
          ))}
      </Select>

      <Select value={selectedSize || ""} onChange={onSizeChange}>
        <option value="">Select Size</option>
        {getAvailableSizes().map((size) => (
          <option
            key={size.id}
            value={size.id}
            disabled={!size.available}
          >
            {size.name} {!size.available && "(Out of stock)"}
          </option>
        ))}
      </Select>
    </SelectionContainer>
  );
};