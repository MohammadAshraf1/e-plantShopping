import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, updateNavbarQuantity }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Helper function to convert a cost string (like "$15") to a number.
  const convertCostToNumber = (cost) => {
    if (typeof cost === 'string') {
      return parseFloat(cost.replace(/[^0-9.]/g, ''));
    }
    return cost;
  };

  // Calculate the total amount for all items in the cart.
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const itemCost = convertCostToNumber(item.cost);
        return total + itemCost * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // Update total quantity whenever the cart changes.
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantity(total);

    // Update the navbar's quantity if the parent provided a callback.
    if (updateNavbarQuantity) {
      updateNavbarQuantity(total);
    }
  }, [cart, updateNavbarQuantity]);

  // Continue shopping handler.
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  // Increment quantity: dispatches updateQuantity to increase the count.
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement quantity: if quantity is greater than 1, decrease it;
  // otherwise, remove the item from the cart.
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove the item from the cart.
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate the subtotal for a single cart item.
  const calculateTotalCost = (item) => {
    const itemCost = convertCostToNumber(item.cost);
    return (itemCost * item.quantity).toFixed(2);
  };

  // Checkout handler: currently alerts the user.
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">
                Unit Price: ${convertCostToNumber(item.cost).toFixed(2)}
              </div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Subtotal: ${calculateTotalCost(item)}
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount">
        Total Quantity: {totalQuantity}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
