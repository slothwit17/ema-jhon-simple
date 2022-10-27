import React, { useEffect, useState } from "react";
import {
  clearTheCart,
  deleteFromDb,
  getStoredCart,
} from "../../utilities/fakedb";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import placeOrderImg from "../../images/Port.gif";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const removeItemHandler = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    deleteFromDb(productKey);
  };

  const handlePlaceOrder = () => {
    setCart([]);
    setOrderPlaced(true);
    clearTheCart();
  };

  useEffect(() => {
    const savedCart = getStoredCart();
    const productKeys = Object.keys(savedCart);
    const cartProduct = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProduct);
  }, []);

  //Order place img
  let placedOder;
  if (orderPlaced) {
    placedOder = <img src={placeOrderImg} alt="Your order is placed." />;
  }
  return (
    <div className="main-container">
      <div className="product-container">
        {cart.map((product) => (
          <ReviewItem
            removeItemHandler={removeItemHandler}
            key={product.key}
            product={product}
          ></ReviewItem>
        ))}
        <div style={{ textAlign: "center" }}>{placedOder}</div>
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handlePlaceOrder} className="main-button">
            Place Order
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
