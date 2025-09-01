import { useNavigate } from "react-router-dom";
import {
  PopupOverlay,
  PopupBox,
  PopupMessage,
  PopupButtons,
  ContinueButton,
  CartButton,
} from "./shared/PopupComponents";

export const AddToCartPopup = ({ isOpen, onClose, quantity }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleContinueShopping = () => {
    onClose();
    navigate("/merch");
  };

  const handleGoToCart = () => {
    onClose();
    navigate("/cart");
  };

  return (
    <PopupOverlay>
      <PopupBox>
        <PopupMessage>
          You've added <strong>{quantity}</strong> item{quantity !== 1 ? "s" : ""} to your cart
        </PopupMessage>
        <PopupButtons>
          <ContinueButton onClick={handleContinueShopping}>
            Continue shopping
          </ContinueButton>
          <CartButton onClick={handleGoToCart}>
            Go to cart
          </CartButton>
        </PopupButtons>
      </PopupBox>
    </PopupOverlay>
  );
};