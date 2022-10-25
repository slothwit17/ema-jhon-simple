import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = (props) => {
  const cart = props.cart;
  const total = cart.reduce(
    (total, singleProduct) =>
      total + singleProduct.price * singleProduct.quantity,
    0
  );
  const tax = total / 10;
  let shipping = 0;
  if (total > 35) {
    shipping = 2.99;
  } else if (total > 15) {
    shipping = 6.99;
  } else if (total > 0) {
    shipping = 12.99;
  }
  const grandTotal = shipping + total + tax;

  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };
  return (
    <div className="cart">
      <div className="cart-header">
        <h3>Order Summary</h3>
        <h4>Items ordered: {cart.length}</h4>
      </div>
      <div className="cart-content">
        <p>Items: </p>
        <p>${formatNumber(total)}</p>
      </div>
      <div className="cart-content">
        <p>Estimated Tax + vat: </p>
        <p>${formatNumber(tax)}</p>
      </div>
      <div className="cart-content">
        <p>Shipping and Handing: </p>
        <p>${shipping}</p>
      </div>
      <div className="cart-content">
        <h4>Order Total: </h4>
        <h4>${formatNumber(grandTotal)}</h4>
      </div>
      <br />
      <Link to="/review">
        <button className="main-button">Review Order</button>
      </Link>
    </div>
  );
};

export default Cart;
