import React from "react";
import {
  PopupOverlay,
  PopupBox,
  PopupMessage,
  PopupButtons,
  ContinueButton,
  CartButton,
} from "../pages/ProductPage.styles";

export const ClearCartPopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <PopupOverlay>
      <PopupBox>
        <PopupMessage>
          Are you sure you want to clear your entire cart? This action cannot be undone.
        </PopupMessage>
        <PopupButtons>
          <ContinueButton onClick={onClose}>
            Cancel
          </ContinueButton>
          <CartButton onClick={handleConfirm}>
            Clear Cart
          </CartButton>
        </PopupButtons>
      </PopupBox>
    </PopupOverlay>
  );
};